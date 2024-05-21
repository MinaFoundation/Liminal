import * as L from "liminal"
import { InsufficientAllowance } from "../Erc20/Erc20.contract.ts"

/** The amount of the given token held by a given id. */
export class Balances extends L.MerkleMap(L.id, L.u256) {}
/** The one who allocates funds. */
export class Allocator extends L.id {}
/** The one to whom funds are allocated. */
export class Allocatee extends L.id {}
/** The lookup of allocations of a particular allocator. */
export class Allocated extends L.MerkleMap(Allocatee, L.u256) {}
/** The lookup of all allocators' allocations. */
export class Allocations extends L.MerkleMap(Allocator, Allocated) {}

export const balances_ = Balances.state()
export const allocations_ = Allocations.state()

export function* transfer() {
  const { to, amount } = yield* L.use({ to: L.id, amount: L.u256 })
  const balances = yield* balances_()
  const updatedSenderBalance = yield* balances
    .get(L.sender)
    .match(L.u256, (balance) =>
      balance
        .gte(amount)
        .if(balance.subtract(amount))
        .else(InsufficientBalanceError.new()))
    .match(L.None, InsufficientBalanceError.new())
    ["?"](InsufficientBalanceError)
  const updatedToBalance = balances
    .get(to)
    .match(L.u256, (value) => value.add(amount))
    .match(L.None, amount)
  yield* balances_(
    balances
      .set(L.sender, updatedSenderBalance)
      .set(to, updatedToBalance),
  )
  yield Transfer.new({ to, amount })
}

export class InsufficientBalanceError extends L.Struct({ tag: "InsufficientBalanceError" }) {}

export class Transfer extends L.Struct({
  tag: "Transfer",
  to: L.id,
  amount: L.u256,
}) {}

export function* allocate() {
  const { for_, amount } = yield* L.use({
    for_: Allocatee,
    amount: L.u256,
  })
  const balances = yield* balances_()
  const newSenderBalance = yield* balances
    .get(L.sender)
    .match(L.u256, (v) =>
      v
        .gte(amount)
        .if(v.subtract(amount))
        .else(InsufficientBalanceError.new()))
    .match(L.None, InsufficientBalanceError.new())
    ["?"](InsufficientBalanceError)
  yield* balances_(balances.set(L.sender, newSenderBalance))
  const allocations = yield* allocations_()
  const allocatorAllocated = allocations
    .get(L.sender)
    .match(Allocated, (allocated) => {
      const newAllocation = allocated
        .get(for_)
        .match(L.u256, (v) => v.add(amount))
        .match(L.None, amount)
      return allocated.set(for_, newAllocation)
    })
    .match(L.None, Allocated.new().set(for_, amount))
  yield* allocations_(allocations.set(L.sender, allocatorAllocated))
}

export class Reserve extends L.Struct({
  tag: "Reserve",
  for: L.id,
  amount: L.u256,
}) {}

export function* withdraw({}: {
  from: L.id
  to: L.id
  amount: L.u256 | L.None
}) {}

export class Withdraw extends L.Struct({
  tag: "Withdraw",
  from: L.id,
  to: L.id,
  amount: L.u256,
}) {}

export function* deallocate() {
  const { for_, amount } = yield* L.use({
    for_: Allocatee,
    amount: L.u256,
  })
  const allocations = yield* allocations_()
  const allocatorAllocated = yield* allocations
    .get(L.sender)
    .match(Allocated, (allocated) => {
      const newAllocation = allocated
        .get(for_)
        .match(L.u256, (v) =>
          v.gte(amount)
            .if(allocated.set(for_, v.subtract(amount)))
            .else(InsufficientAllowance.new()))
        .match(L.None, InsufficientAllowance.new())
      return newAllocation
    })
    .match(L.None, InsufficientAllowance.new())
    ["?"](InsufficientAllowance)
  yield* allocations_(allocations.set(L.sender, allocatorAllocated))

  const balances = yield* balances_()
  const newSenderBalance = balances.get(L.sender)
    .match(L.u256, (v) => v.add(amount))
    // This really shouldn't happen: there is no way for the sender
    // to have allocated funds if they never had a balance
    .match(L.None, amount)
  yield* balances_(balances.set(L.sender, newSenderBalance))
}
