import * as L from "liminal"

export class ERC20 {
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
    yield fromBalance.gte(amount).assert(new InsufficientBalanceError({}))
    const recipientBalance = yield* balances.get(recipient).handle(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = balances
      .set(L.sender, fromBalance.subtract(amount))
      .set(recipient, recipientBalance.add(amount))
    yield* this.#balances.set(updated)
    yield new TransferEvent({
      from: L.caller,
      to: recipient,
      value: amount,
    })
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

  *transferFrom(sender: L.id, recipient: L.id, amount: L.u256) {
    const allowances = yield* this.#allowances
    const recipientAllowances = yield* allowances.get(recipient).unhandle(L.None)
    const recipientAllowanceFromSender = yield* recipientAllowances.get(sender).unhandle(L.None)
    yield recipientAllowanceFromSender.gte(amount).assert(new InsufficientBalanceError({}))
  }
}

export class Balances extends L.MerkleMap(L.id, L.u256) {}

// We could just reuse `Balances`, ie.
//
// ```ts
// class Allowances extends L.MerkleMap(L.id, Balances) {}
// ```
//
// However, the following helps with signature legibility.
export class Owner extends L.id {}
export class Spender extends L.id {}
export class AllowedBy extends L.MerkleMap(Spender, L.u256) {}
export class Allowances extends L.MerkleMap(Owner, AllowedBy) {}

export class TransferEvent extends L.Struct({
  event: L.constant("Transfer"),
  from: L.id,
  to: L.id,
  value: L.u256,
}) {}

export class ApprovalEvent extends L.Struct({
  event: L.constant("Approval"),
  owner: L.id,
  spender: L.id,
  value: L.u256,
}) {}

export class InsufficientBalanceError extends L.Struct({
  error: L.constant("InsufficientBalanceError"),
}) {}
