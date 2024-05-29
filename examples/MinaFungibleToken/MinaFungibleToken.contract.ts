import * as L from "liminal"

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

export class Transfer extends L.Struct({
  tag: "Transfer",
  to: L.id,
  amount: L.u256,
}) {}

export class Allocate extends L.Struct({
  tag: "Allocate",
  from: L.id,
  for: L.id,
  amount: L.u256,
}) {}

export class Deallocate extends L.Struct({
  tag: "Deallocate",
  from: L.id,
  for: L.id,
  amount: L.u256,
}) {}

export class Withdraw extends L.Struct({
  tag: "Withdraw",
  from: L.id,
  to: L.id,
  amount: L.u256,
}) {}

export class InsufficientBalance extends L.Struct({ tag: "InsufficientBalance" }) {}
export class InsufficientAllowance extends L.Struct({ tag: "InsufficientAllowance" }) {}

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
        .else(InsufficientBalance.new()))
    .match(L.None, InsufficientBalance.new())
    ["?"](InsufficientBalance)
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
        .else(InsufficientBalance.new()))
    .match(L.None, InsufficientBalance.new())
    ["?"](InsufficientBalance)
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
  yield Allocate.new({ from: L.sender, for: for_, amount })
}

// TODO: enable not specifying `amount`
export function* withdraw() {
  const { from, amount } = yield* L.use({
    from: L.id,
    amount: L.u256,
  })

  const balances = yield* balances_()
  const balanceSender = balances.get(L.sender).match(L.None, L.u256.new(0))
  const allocations = yield* allocations_()
  const allocationsFromFrom = yield* allocations
    .get(from)
    ["?"](L.None, InsufficientAllowance.new())
  const allocationFromFromToSender = yield* allocationsFromFrom
    .get(L.sender)
    ["?"](L.None, InsufficientAllowance.new())
  yield* allocationFromFromToSender.gte(amount).not().assert(InsufficientAllowance.new())
  yield* allocations_(
    allocations.set(
      from,
      allocationsFromFrom.set(L.sender, allocationFromFromToSender.subtract(amount)),
    ),
  )
  yield* balances_(balances.set(L.sender, balanceSender.add(amount)))
  yield Withdraw.new({ from, to: L.sender, amount })
}

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
  const newSenderBalance = balances
    .get(L.sender)
    .match(L.u256, (v) => v.add(amount))
    .match(L.None, amount)
  yield* balances_(balances.set(L.sender, newSenderBalance))
  yield Deallocate.new({ from: L.sender, for: for_, amount })
}
