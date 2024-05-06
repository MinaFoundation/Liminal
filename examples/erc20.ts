import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Allowances extends L.MerkleMap(L.id, Balances) {}

export class FungibleToken {
  #totalSupply
  #balances
  #allowances

  constructor() {
    this.#totalSupply = new L.State(L.u256)
    this.#balances = new L.State(Balances)
    this.#allowances = new L.State(Allowances)
  }

  *totalSupply() {
    return yield* this.#totalSupply
  }

  *balanceOf(account: L.id) {
    const balances = yield* this.#balances
    return balances.get(account)
  }

  *transfer(recipient: L.id, amount: L.u256) {
    const balances = yield* this.#balances
    const fromBalance = balances.get(L.sender)
    yield fromBalance.gte(amount).assert(new InsufficientBalanceError())
    const recipientBalance = balances.get(recipient)
    const updated = balances
      .set(L.sender, fromBalance.subtract(amount))
      .set(recipient, recipientBalance.add(amount))
    yield* this.#balances.set(updated)
  }

  *allowance(owner: L.id, spender: L.id) {}

  *approve(spender: L.id, amount: L.id) {}

  *transferFrom(
    sender: L.id,
    recipient: L.id,
    amount: L.id,
  ) {}
}

export class TransferEvent extends L.Struct({
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

export class ApprovalEvent extends L.Struct({
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

export class InsufficientBalanceError extends L.Tagged("InsufficientBalanceError") {}
