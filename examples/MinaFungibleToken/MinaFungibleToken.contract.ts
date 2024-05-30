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
  const { to, amount, balances } = yield* L.use({
    to: L.id,
    amount: L.u256,
    balances: balances_,
  })
  const updatedSenderBalance = yield* balances
    .get(L.sender)
    .case(L.u256, (balance) =>
      balance
        .gte(amount)
        .if(balance.subtract(amount))
        .else(InsufficientBalance.new()))
    .case(L.None, InsufficientBalance.new())
    ["?"](InsufficientBalance)
  const updatedToBalance = balances
    .get(to)
    .case(L.u256, (value) => value.add(amount))
    .case(L.None, amount)
  yield* balances_(
    balances
      .set(L.sender, updatedSenderBalance)
      .set(to, updatedToBalance),
  )
  yield Transfer.new({ to, amount })
}

export function* allocate() {
  const { for_, amount, balances, allocations } = yield* L.use({
    for_: Allocatee,
    amount: L.u256,
    balances: balances_,
    allocations: allocations_,
  })
  const newSenderBalance = yield* balances
    .get(L.sender)
    .case(L.u256, (v) =>
      v
        .gte(amount)
        .if(v.subtract(amount))
        .else(InsufficientBalance.new()))
    .case(L.None, InsufficientBalance.new())
    ["?"](InsufficientBalance)
  yield* balances_(balances.set(L.sender, newSenderBalance))
  const allocatorAllocated = allocations
    .get(L.sender)
    .case(Allocated, (allocated) => {
      const newAllocation = allocated
        .get(for_)
        .case(L.u256, (v) => v.add(amount))
        .case(L.None, amount)
      return allocated.set(for_, newAllocation)
    })
    .case(L.None, Allocated.new().set(for_, amount))
  yield* allocations_(allocations.set(L.sender, allocatorAllocated))
  yield Allocate.new({ from: L.sender, for: for_, amount })
}

// TODO: enable not specifying `amount`
export function* withdraw() {
  const { from, amount, balances, allocations } = yield* L.use({
    from: L.id,
    amount: L.u256,
    balances: balances_,
    allocations: allocations_,
  })
  const senderBalance = balances.get(L.sender).case(L.None, L.u256.new(0))
  const fromAllocations = yield* allocations
    .get(from)
    ["?"](L.None, InsufficientAllowance.new())
  const senderFromAllocation = yield* fromAllocations
    .get(L.sender)
    ["?"](L.None, InsufficientAllowance.new())
  yield* senderFromAllocation.gte(amount).not().assert(InsufficientAllowance.new())
  yield* allocations_(
    allocations.set(
      from,
      fromAllocations.set(L.sender, senderFromAllocation.subtract(amount)),
    ),
  )
  yield* balances_(balances.set(L.sender, senderBalance.add(amount)))
  yield Withdraw.new({ from, to: L.sender, amount })
}

export function* deallocate() {
  const { for_, amount, allocations, balances } = yield* L.use({
    for_: Allocatee,
    amount: L.u256,
    allocations: allocations_,
    balances: balances_,
  })
  const allocatorAllocated = yield* allocations
    .get(L.sender)
    .case(Allocated, (allocated) => {
      const newAllocation = allocated
        .get(for_)
        .case(L.u256, (v) =>
          v.gte(amount)
            .if(allocated.set(for_, v.subtract(amount)))
            .else(InsufficientAllowance.new()))
        .case(L.None, InsufficientAllowance.new())
      return newAllocation
    })
    .case(L.None, InsufficientAllowance.new())
    ["?"](InsufficientAllowance)
  yield* allocations_(allocations.set(L.sender, allocatorAllocated))
  const newSenderBalance = balances
    .get(L.sender)
    .case(L.u256, (v) => v.add(amount))
    .case(L.None, amount)
  yield* balances_(balances.set(L.sender, newSenderBalance))
  yield Deallocate.new({ from: L.sender, for: for_, amount })
}
