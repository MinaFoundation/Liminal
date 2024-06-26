import * as L from "liminal"

/** The amount of the given token held by a given id. */
export class Balances extends L.Mapping(L.id, L.u256) {}
/** The one who allocates funds. */
export class Allocator extends L.id {}
/** The one to whom funds are allocated. */
export class Allocatee extends L.id {}
/** The lookup of allocations of a particular allocator. */
export class Allocated extends L.Mapping(Allocatee, L.u256) {}
/** The lookup of all allocators' allocations. */
export class Allocations extends L.Mapping(Allocator, Allocated) {}

export class TransferEvent extends L.Struct({
  tag: "Transfer",
  to: L.id,
  amount: L.u256,
}) {}

export class AllocateEvent extends L.Struct({
  tag: "Allocate",
  from: L.id,
  for: L.id,
  amount: L.u256,
}) {}

export class DeallocateEvent extends L.Struct({
  tag: "Deallocate",
  from: L.id,
  for: L.id,
  amount: L.u256,
}) {}

export class WithdrawEvent extends L.Struct({
  tag: "Withdraw",
  from: L.id,
  to: L.id,
  amount: L.u256,
}) {}

export class InsufficientBalanceError extends L.Struct({ tag: "InsufficientBalance" }) {}
export class InsufficientAllowanceError extends L.Struct({ tag: "InsufficientAllowance" }) {}

export const balances = Balances.new()
export const allocations = Allocations.new()

export const Transfer = L.effect({
  to: L.id,
  amount: L.u256,
}, function*({ to, amount }) {
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
  yield* balances.assign(
    balances
      .set(L.sender, updatedSenderBalance)
      .set(to, updatedToBalance),
  )
  yield TransferEvent.new({ to, amount })
})

export const Allocate = L.effect({
  for_: Allocatee,
  amount: L.u256,
}, function*({ for_, amount }) {
  const newSenderBalance = yield* balances
    .get(L.sender)
    .match(L.u256, (v) =>
      v
        .gte(amount)
        .if(v.subtract(amount))
        .else(InsufficientBalanceError.new()))
    .match(L.None, InsufficientBalanceError.new())
    ["?"](InsufficientBalanceError)
  yield* balances.assign(balances.set(L.sender, newSenderBalance))
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
  yield* allocations.assign(allocations.set(L.sender, allocatorAllocated))
  yield AllocateEvent.new({ from: L.sender, for: for_, amount })
})

export const withdraw = L.effect({
  from: L.id,
  amount: L.u256,
}, function*({ from, amount }) {
  const senderBalance = balances.get(L.sender).match(L.None, L.u256.new(0))
  const fromAllocations = yield* allocations.get(from)
    ["?"](L.None, InsufficientAllowanceError.new())
  const senderFromAllocation = yield* fromAllocations.get(L.sender)
    ["?"](L.None, InsufficientAllowanceError.new())
  yield* senderFromAllocation.gte(amount).not().assert(InsufficientAllowanceError.new())
  yield* allocations.assign(
    allocations.set(
      from,
      fromAllocations.set(L.sender, senderFromAllocation.subtract(amount)),
    ),
  )
  yield* balances.assign(balances.set(L.sender, senderBalance.add(amount)))
  yield WithdrawEvent.new({ from, to: L.sender, amount })
})

export const Deallocate = L.effect({
  for_: Allocatee,
  amount: L.u256,
}, function*({ for_, amount }) {
  const allocatorAllocated = yield* allocations
    .get(L.sender)
    .match(Allocated, (allocated) => {
      const newAllocation = allocated
        .get(for_)
        .match(L.u256, (v) =>
          v
            .gte(amount)
            .if(allocated.set(for_, v.subtract(amount)))
            .else(InsufficientAllowanceError.new()))
        .match(L.None, InsufficientAllowanceError.new())
      return newAllocation
    })
    .match(L.None, InsufficientAllowanceError.new())
    ["?"](InsufficientAllowanceError)
  yield* allocations.assign(allocations.set(L.sender, allocatorAllocated))
  const newSenderBalance = balances
    .get(L.sender)
    .match(L.u256, (v) => v.add(amount))
    .match(L.None, amount)
  yield* balances.assign(balances.set(L.sender, newSenderBalance))
  yield DeallocateEvent.new({ from: L.sender, for: for_, amount })
})
