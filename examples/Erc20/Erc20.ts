import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Allowances extends L.MerkleMap(L.id, Balances) {}

export const totalSupply_ = L.State(L.u256)
export const balances_ = L.State(Balances)
export const allowances_ = L.State(Allowances)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L16
export class Transfer extends L.Struct({
  tag: L.const("Transfer"),
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export class Approval extends L.Struct({
  tag: L.const("Approval"),
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

export class AlreadyInitialized extends L.Struct({
  tag: L.const("AlreadyInitialized"),
}) {}
export class InsufficientBalance extends L.Struct({
  tag: L.const("InsufficientBalance"),
}) {}
export class CannotTargetNullAddress extends L.Struct({
  tag: L.const("CannotTargetNullAddress"),
}) {}
export class InsufficientAllowance extends L.Struct({
  tag: L.const("InsufficientAllowance"),
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export function totalSupply() {
  return totalSupply_
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L32
export function* balanceOf(account: L.id) {
  return balances_
    .get(account)
    .match(L.None, function*() {
      return L.u256.from(0)
    })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L41
export function* transfer(to: L.id, value: L.u256) {
  yield* assertHasBalanceGte(L.sender, value)
  const senderBalance = yield* balances_.get(L.sender).unhandle(L.None, InsufficientBalance.of({}))
  const newSenderBalance = senderBalance.subtract(value)
  const toNewBalance = balances_
    .get(to)
    .match(L.u256, function*(prev) {
      return prev.add(value)
    })
    .match(L.None, function*() {
      return value
    })
  const newBalances = balances_
    .set(L.sender, newSenderBalance)
    .set(to, toNewBalance)
  yield* L.setState(balances_, newBalances)
  yield* to.equals(L.id.null).if(function*() {
    const newTotalSupply = totalSupply_.subtract(value)
    yield* L.setState(totalSupply_, newTotalSupply)
  })
  yield Transfer.of({ from: L.sender, to, value })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L50
export function* allowance(owner: L.id, spender: L.id) {
  return allowances_
    .get(owner)
    .match(Balances, function*(balances) {
      return balances.get(spender)
    })
    .match(L.None, function*() {
      return L.u256.from(0)
    })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L67
export function* approve(spender: L.id, value: L.u256) {
  yield* assertNotNullAddress(L.sender)
  yield* assertNotNullAddress(spender)
  yield* assertHasBalanceGte(spender, value)

  const ownerApprovals = allowances_
    .get(L.sender)
    .match(L.None, function*() {
      return new Balances()
    })
  const newSpenderAllowance = ownerApprovals
    .get(spender)
    .match(L.u256, function*(prev) {
      return prev.add(value)
    })
    .match(L.None, function*() {
      return value
    })
  const newOwnerApprovals = ownerApprovals.set(spender, newSpenderAllowance)
  const newAllowances = allowances_.set(L.sender, newOwnerApprovals)
  yield* L.setState(allowances_, newAllowances)
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L78
export function* transferFrom(from: L.id, to: L.id, value: L.u256) {
  yield assertNotNullAddress(from)
  yield assertNotNullAddress(to)
  const fromApprovals = yield* allowances_
    .get(from)
    .unhandle(L.None, InsufficientAllowance.of({}))
  const senderAllowance = yield* fromApprovals
    .get(L.sender)
    .unhandle(L.None, InsufficientAllowance.of({}))
  yield senderAllowance.gt(value).assert(InsufficientAllowance.of({}))
  const newSenderAllowance = senderAllowance.subtract(value)
  const newFromApprovals = fromApprovals.set(L.sender, newSenderAllowance)
  const newAllowances = allowances_.set(from, newFromApprovals)
  yield* L.setState(allowances_, newAllowances)
  yield* assertHasBalanceGte(from, value)
  const fromBalance = yield* balances_.get(from).unhandle(L.None, InsufficientBalance.of({}))
  const newFromBalance = fromBalance.subtract(value)
  const toNewBalance = balances_
    .get(to)
    .match(L.u256, function*(prev) {
      return prev.add(value)
    })
    .match(L.None, function*() {
      return value
    })
  const newBalances = balances_
    .set(from, newFromBalance)
    .set(to, toNewBalance)
  yield* L.setState(balances_, newBalances)
}

function* assertHasBalanceGte(inQuestion: L.id, value: L.u256) {
  const inQuestionBalance = yield* balances_
    .get(inQuestion)
    .unhandle(L.None, InsufficientBalance.of({}))
  yield inQuestionBalance
    .gte(value)
    .assert(InsufficientBalance.of({}))
}

function* assertNotNullAddress(inQuestion: L.id) {
  return inQuestion.equals(L.id.null).not().assert(CannotTargetNullAddress.of({}))
}
