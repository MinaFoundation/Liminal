import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Allowances extends L.MerkleMap(L.id, Balances) {}

export const totalSupply_ = L.u256.state()
export const balances_ = Balances.state()
export const allowances_ = Allowances.state()

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L16
export class Transfer extends L.Struct({
  tag: "Transfer",
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export class Approval extends L.Struct({
  tag: "Approval",
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

export class AlreadyInitialized extends L.Struct({
  tag: "AlreadyInitialized",
}) {}
export class InsufficientBalance extends L.Struct({
  tag: "InsufficientBalance",
}) {}
export class CannotTargetNullAddress extends L.Struct({
  tag: "CannotTargetNullAddress",
}) {}
export class InsufficientAllowance extends L.Struct({
  tag: "InsufficientAllowance",
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export function totalSupply() {
  return totalSupply_()
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L32
export function balanceOf(account: L.id) {
  return balances_().get(account).match(L.None, L.u256.new(0))
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L41
export function* transfer(to: L.id, value: L.u256) {
  yield* assertHasBalanceGte(L.sender, value)
  const senderBalance = yield* balances_()
    .get(L.sender)
    .unhandle(L.None, InsufficientBalance.new())
  const newSenderBalance = senderBalance.subtract(value)
  const toNewBalance = balances_()
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances_()
    .set(L.sender, newSenderBalance)
    .set(to, toNewBalance)
  balances_(newBalances)
  yield* to.equals(L.id.null).if(function*() {
    const newTotalSupply = totalSupply_().subtract(value)
    totalSupply_(newTotalSupply)
  })
  yield Transfer.new({ from: L.sender, to, value })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L50
export function allowance(owner: L.id, spender: L.id) {
  return allowances_()
    .get(owner)
    .match(Balances, (balances) => balances.get(spender))
    .match(L.None, L.u256.new(0))
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L67
export function* approve(spender: L.id, value: L.u256) {
  yield* assertNotNullAddress(L.sender)
  yield* assertNotNullAddress(spender)
  yield* assertHasBalanceGte(spender, value)
  const ownerApprovals = allowances_()
    .get(L.sender)
    .match(L.None, Balances.new())
  const newSpenderAllowance = ownerApprovals
    .get(spender)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newOwnerApprovals = ownerApprovals.set(spender, newSpenderAllowance)
  const newAllowances = allowances_().set(L.sender, newOwnerApprovals)
  allowances_(newAllowances)
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L78
export function* transferFrom(from: L.id, to: L.id, value: L.u256) {
  yield* assertNotNullAddress(from)
  yield* assertNotNullAddress(to)
  const fromApprovals = yield* allowances_()
    .get(from)
    .unhandle(L.None, InsufficientAllowance.new())
  const senderAllowance = yield* fromApprovals
    .get(L.sender)
    .unhandle(L.None, InsufficientAllowance.new())
  yield senderAllowance.gt(value).assert(InsufficientAllowance.new())
  const newSenderAllowance = senderAllowance.subtract(value)
  const newFromApprovals = fromApprovals.set(L.sender, newSenderAllowance)
  const newAllowances = allowances_().set(from, newFromApprovals)
  allowances_(newAllowances)
  yield* assertHasBalanceGte(from, value)
  const fromBalance = yield* balances_()
    .get(from)
    .unhandle(L.None, InsufficientBalance.new())
  const newFromBalance = fromBalance.subtract(value)
  const toNewBalance = balances_()
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances_()
    .set(from, newFromBalance)
    .set(to, toNewBalance)
  balances_(newBalances)
}

function* assertHasBalanceGte(inQuestion: L.id, value: L.u256) {
  const inQuestionBalance = yield* balances_()
    .get(inQuestion)
    .unhandle(L.None, InsufficientBalance.new())
  yield inQuestionBalance
    .gte(value)
    .assert(InsufficientBalance.new())
}

function* assertNotNullAddress(inQuestion: L.id) {
  return inQuestion
    .equals(L.id.null)
    .not()
    .assert(CannotTargetNullAddress.new())
}
