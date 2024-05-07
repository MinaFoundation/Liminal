import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}

// We could just reuse `Balances` as `L.MerkleMap(L.id, Balances)`,
// but the following helps with signature legibility.
export class Owner extends L.id {}
export class Spender extends L.id {}
export class AllowedBy extends L.MerkleMap(Spender, L.u256) {}
export class Allowances extends L.MerkleMap(Owner, AllowedBy) {}

export class FungibleToken {
  #totalSupply = new L.State(L.u256)
  #balances = new L.State(Balances)
  #allowances = new L.State(Allowances);

  *totalSupply() {
    return yield* this.#totalSupply
  }

  *balanceOf(account: L.id) {
    const balances = yield* this.#balances
    return balances.get(account)
  }

  *transfer(recipient: L.id, amount: L.u256) {
    const balances = yield* this.#balances
    const fromBalance = yield* balances.get(L.sender).unhandle(L.None)
    yield fromBalance.gte(amount).assert(new InsufficientBalanceError())
    const recipientBalance = yield* balances.get(recipient).handle(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = balances
      .set(L.sender, fromBalance.subtract(amount))
      .set(recipient, recipientBalance.add(amount))
    yield* this.#balances.set(updated)
  }

  *allowance(owner: Owner, spender: Spender) {
    const allowances = yield* this.#allowances
    const spenderAllowances = yield* allowances.get(owner).unhandle(L.None)
    return spenderAllowances.get(spender)
  }

  *approve(spender: Spender, amount: L.u256) {
    const allowances = yield* this.#allowances
    const ownerAllowedBy = yield* allowances.get(L.caller).handle(L.None, function*() {
      return new AllowedBy()
    })
    const spenderAllows = yield* ownerAllowedBy.get(spender).handle(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = allowances.set(L.caller, ownerAllowedBy.set(spender, spenderAllows.add(amount)))
    yield* this.#allowances.set(updated)
  }

  *transferFrom(sender: L.id, recipient: L.id, amount: L.id) {
    const allowances = yield* this.#allowances
    const recipientAllowanceFromSender = L.call(function*() {
      const recipientAllowances = yield* allowances.get(recipient).unhandle(L.None)
      return yield* recipientAllowances.get(sender).unhandle(L.None)
    }).rehandle(L.None)
  }
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

export class InsufficientBalanceError extends L.Err("InsufficientBalanceError") {}

declare const x: TransferEvent | ApprovalEvent | InsufficientBalanceError
function* g() {
  const y = yield* x
    .match()
    .when(TransferEvent, function*(v) {
      return L.u8.from(1)
    })
    .when(ApprovalEvent, function*(v) {
      return L.u8.from(1)
    })
    .else(function*(v) {
      return L.u8.from(1)
    })
}
