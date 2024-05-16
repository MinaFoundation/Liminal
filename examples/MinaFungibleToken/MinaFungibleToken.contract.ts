import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Reserves extends L.MerkleMap(L.id, Balances) {}

export const totalSupply_ = L.u256.state()
export const balances_ = Balances.state()
export const reserves_ = Reserves.state()

export function* transfer({ to, amount }: {
  to: L.id
  amount: L.u256
}) {
  const balances = yield* balances_()
  const updatedSenderBalance = yield* balances
    .get(L.sender)
    .match(L.None, InsufficientBalanceError.new())
    .match(L.u256, (balance) =>
      balance
        .gte(amount)
        .if(balance.subtract(amount))
        .else(InsufficientBalanceError.new()))
    ["?"](InsufficientBalanceError)
  const updatedToBalance = balances
    .get(to)
    .match(L.u256, (value) => value.add(amount))
    .match(L.None, L.u256.new(0))
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

export function* reserve(for_: L.id, amount: L.u256 | L.None) {}

export class Reserve extends L.Struct({
  tag: "Reserve",
  for: L.id,
  amount: L.u256,
}) {}

export function* withdraw(from: L.id, to: L.id, amount: L.u256 | L.None) {}

export class Withdraw extends L.Struct({
  tag: "Withdraw",
  from: L.id,
  to: L.id,
  amount: L.u256,
}) {}
