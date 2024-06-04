import * as L from "liminal"

export class Balances extends L.Mapping(L.id, L.u256) {}
export class Allowances extends L.Mapping(L.id, Balances) {}

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
export const totalSupply = L.f({ totalSupply: totalSupply_ }, ({ totalSupply }) => totalSupply)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L32
export const balanceOf = L.f({
  account: L.id,
  balances: balances_,
}, ({ account, balances }) => balances.get(account).match(L.None, L.u256.new(0)))

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L41
export const transfer = L.f({
  to: L.id,
  value: L.u256,
  balances: balances_,
  totalSupply: totalSupply_,
}, function*({ to, value, balances, totalSupply }) {
  yield* assertHasBalanceGte(balances, L.sender, value)
  const senderBalance = yield* balances.get(L.sender)["?"](L.None, InsufficientBalance.new())
  const newSenderBalance = senderBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances.set(L.sender, newSenderBalance).set(to, toNewBalance)
  yield* balances_(newBalances)
  yield* to.equals(L.nullId).if(totalSupply_(totalSupply.subtract(value)))
  yield Transfer.new({ from: L.sender, to, value })
})

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L50
export const allowance = L.f({
  owner: L.id,
  spender: L.id,
  allowances: allowances_,
}, ({ owner, spender, allowances }) =>
  allowances
    .get(owner)
    .match(L.None, L.u256.new(0))
    .match(Balances, (balances) => balances.get(spender)))

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L67
export const approve = L.f({
  spender: L.id,
  value: L.u256,
  allowances: allowances_,
  balances: balances_,
}, function*({ spender, value, allowances, balances }) {
  yield* assertNotNullAddress(L.sender)
  yield* assertNotNullAddress(spender)
  yield* assertHasBalanceGte(balances, spender, value)
  const ownerApprovals = allowances.get(L.sender).match(L.None, Balances.new())
  const newSpenderAllowance = ownerApprovals
    .get(spender)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newOwnerApprovals = ownerApprovals.set(spender, newSpenderAllowance)
  const newAllowances = allowances.set(L.sender, newOwnerApprovals)
  yield* allowances_(newAllowances)
})

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/IERC20.sol#L78
export const transferFrom = L.f({
  from: L.id,
  to: L.id,
  value: L.u256,
  allowances: allowances_,
  balances: balances_,
}, function*({ from, to, value, allowances, balances }) {
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
  yield* allowances_(newAllowances)
  yield* assertHasBalanceGte(balances, from, value)
  const fromBalance = yield* balances
    .get(from)
    ["?"](L.None, InsufficientBalance.new())
  const newFromBalance = fromBalance.subtract(value)
  const toNewBalance = balances
    .get(to)
    .match(L.u256, (prev) => prev.add(value))
    .match(L.None, value)
  const newBalances = balances.set(from, newFromBalance).set(to, toNewBalance)
  yield* balances_(newBalances)
})

function* assertHasBalanceGte(balances: Balances, inQuestion: L.id, value: L.u256) {
  const inQuestionBalance = yield* balances.get(inQuestion)["?"](L.None, InsufficientBalance.new())
  yield* inQuestionBalance.gte(value).assert(InsufficientBalance.new())
}

function assertNotNullAddress(inQuestion: L.id) {
  return inQuestion
    .equals(L.nullId)
    .not()
    .assert(CannotTargetNullAddress.new())
}
