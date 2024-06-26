import * as L from "liminal"

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export const totalSupply = L.u256.new(parseInt(Deno.env.get("TOTAL_SUPPLY")!))

export class Balances extends L.Mapping(L.id, L.u256) {}
export const balances = Balances.new()

export class Allowances extends L.Mapping(L.id, Balances) {}
export const allowances = Allowances.new()

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L16
export class TransferEvent extends L.Struct({
  tag: "Transfer",
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export class ApprovalEvent extends L.Struct({
  tag: "Approval",
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

export class AlreadyInitialized extends L.Struct({ tag: "AlreadyInitialized" }) {}
export class InsufficientBalance extends L.Struct({ tag: "InsufficientBalance" }) {}
export class CannotTargetNullAddress extends L.Struct({ tag: "CannotTargetNullAddress" }) {}
export class InsufficientAllowance extends L.Struct({ tag: "InsufficientAllowance" }) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L32
export const balanceOf = L.pure(
  { account: L.id },
  ({ account }) => balances.get(account).match(L.None, L.u256.new(0)),
)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L41
export const Transfer = L.f({
  to: L.id,
  value: L.u256,
}, function*({ to, value }) {
  yield* assertHasBalanceGte(L.sender, value)
  const senderBalance = yield* balances.get(L.sender)["?"](L.None, InsufficientBalance.new())
  const newSenderBalance = senderBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances.set(L.sender, newSenderBalance).set(to, toNewBalance)
  yield* balances.assign(newBalances)
  yield* to.equals(L.nullId).if(totalSupply.assign(totalSupply.subtract(value)))
  yield TransferEvent.new({ from: L.sender, to, value })
})

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L50
export const Allowance = L.pure({
  owner: L.id,
  spender: L.id,
}, ({ owner, spender }) =>
  allowances
    .get(owner)
    .match(L.None, L.u256.new(0))
    .match(Balances, (balances) => balances.get(spender)))

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L67
export const Approve = L.f({
  spender: L.id,
  value: L.u256,
}, function*({ spender, value }) {
  yield* assertNotNullAddress(L.sender)
  yield* assertNotNullAddress(spender)
  yield* assertHasBalanceGte(spender, value)
  const ownerApprovals = allowances.get(L.sender).match(L.None, Balances.new())
  const newSpenderAllowance = ownerApprovals
    .get(spender)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newOwnerApprovals = ownerApprovals.set(spender, newSpenderAllowance)
  const newAllowances = allowances.set(L.sender, newOwnerApprovals)
  yield* allowances.assign(newAllowances)
})

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L78
export const TransferFrom = L.f({
  from: L.id,
  to: L.id,
  value: L.u256,
}, function*({ from, to, value }) {
  yield* assertNotNullAddress(from)
  yield* assertNotNullAddress(to)
  const fromApprovals = yield* allowances
    .get(from)
    ["?"](L.None, InsufficientAllowance.new())
  const senderAllowance = yield* fromApprovals
    .get(L.sender)
    ["?"](L.None, InsufficientAllowance.new())
  yield* senderAllowance.gt(value).assert(InsufficientAllowance.new())
  const newSenderAllowance = senderAllowance.subtract(value)
  const newFromApprovals = fromApprovals.set(L.sender, newSenderAllowance)
  const newAllowances = allowances.set(from, newFromApprovals)
  yield* allowances.assign(newAllowances)
  yield* assertHasBalanceGte(from, value)
  const fromBalance = yield* balances
    .get(from)
    ["?"](L.None, InsufficientBalance.new())
  const newFromBalance = fromBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances.set(from, newFromBalance).set(to, toNewBalance)
  yield* balances.assign(newBalances)
})

function* assertHasBalanceGte(inQuestion: L.id, value: L.u256) {
  const inQuestionBalance = yield* balances.get(inQuestion)["?"](L.None, InsufficientBalance.new())
  yield* inQuestionBalance.gte(value).assert(InsufficientBalance.new())
}

function assertNotNullAddress(inQuestion: L.id) {
  return inQuestion
    .equals(L.nullId)
    .not()
    .assert(CannotTargetNullAddress.new())
}
