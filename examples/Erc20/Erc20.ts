import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Allowances extends L.MerkleMap(L.id, Balances) {}

export const totalSupply_ = new L.State(L.u256)
export const balances_ = new L.State(Balances)
export const allowances_ = new L.State(Allowances)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L16
export class Transfer extends L.Struct("Transfer", {
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export class Approval extends L.Struct("Approval", {
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L22
export function* totalSupply() {
  return yield* totalSupply_
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L32
export function* balanceOf(account: L.id) {
  const balances = yield* balances_
  return balances.get(account).match(L.None, function*() {
    return L.u256.from(0)
  })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L41
export function* transfer(to: L.id, value: L.u256) {
  const balances = yield* balances_
  const senderBalance = yield* assertHasBalanceGte(L.sender, value)
  const newSenderBalance = senderBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, function*(prev) {
      return prev.add(value)
    })
    .match(L.None, function*() {
      return value
    })
  const newBalances = balances
    .set(L.sender, newSenderBalance)
    .set(to, toNewBalance)
  yield* balances_.set(newBalances)
  yield* to.equals(L.id.null).if(function*() {
    const totalSupply = yield* totalSupply_
    const newTotalSupply = totalSupply.subtract(value)
    yield* totalSupply_.set(newTotalSupply)
  })
  yield Transfer.of({ from: L.sender, to, value })
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L50
export function* allowance(owner: L.id, spender: L.id) {
  const allowances = yield* allowances_
  return allowances
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
  yield assertNotNullAddress(L.sender)
  yield assertNotNullAddress(spender)
  yield* assertHasBalanceGte(spender, value)
  const allowances = yield* allowances_
  const ownerApprovals = allowances.get(L.sender).match(L.None, function*() {
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
  const newAllowances = allowances.set(L.sender, newOwnerApprovals)
  yield* allowances_.set(newAllowances)
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L78
export function* transferFrom(from: L.id, to: L.id, value: L.u256) {
  yield assertNotNullAddress(from)
  yield assertNotNullAddress(to)
  const allowances = yield* allowances_
  const fromApprovals = yield* allowances.get(from).unhandle(L.None, InsufficientAllowance.of({}))
  const senderAllowance = yield* fromApprovals
    .get(L.sender)
    .unhandle(L.None, InsufficientAllowance.of({}))
  yield senderAllowance.gt(value).assert(InsufficientAllowance.of({}))
  const newSenderAllowance = senderAllowance.subtract(value)
  const newFromApprovals = fromApprovals.set(L.sender, newSenderAllowance)
  const newAllowances = allowances.set(from, newFromApprovals)
  yield* allowances_.set(newAllowances)
  const balances = yield* balances_
  const fromBalance = yield* assertHasBalanceGte(from, value)
  const newFromBalance = fromBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, function*(prev) {
      return prev.add(value)
    })
    .match(L.None, function*() {
      return value
    })
  const newBalances = balances.set(from, newFromBalance).set(to, toNewBalance)
  yield* balances_.set(newBalances)
}

function* assertHasBalanceGte(inQuestion: L.id, value: L.u256) {
  const balances = yield* balances_
  const inQuestionBalance = yield* balances
    .get(inQuestion)
    .unhandle(L.None, InsufficientBalance.of({}))
  yield inQuestionBalance
    .gte(value)
    .assert(InsufficientBalance.of({}))
  return inQuestionBalance
}

function assertNotNullAddress(inQuestion: L.id) {
  return inQuestion.equals(L.id.null).not().assert(CannotTargetNullAddress.of({}))
}

export class AlreadyInitialized extends L.Struct("AlreadyInitialized", {}) {}
export class InsufficientBalance extends L.Struct("InsufficientBalance", {}) {}
export class CannotTargetNullAddress extends L.Struct("CannotTargetNullAddress", {}) {}
export class InsufficientAllowance extends L.Struct("InsufficientAllowance", {}) {}
