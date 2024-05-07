import * as L from "liminal"

export class ERC20 {
  #totalSupply = L.State(L.u256)
  #balances = L.State(Balances)
  #allowances = L.State(Allowances);

  *totalSupply() {
    return this.#totalSupply
  }

  *balanceOf(account: L.id) {
    return this.#balances.get(account)
  }

  *transfer(recipient: L.id, amount: L.u256) {
    const fromBalance = yield* this.#balances.get(L.sender).unhandle(L.None)
    yield fromBalance.gte(amount).assert(new InsufficientBalanceError({}))
    const recipientBalance = yield* this.#balances.get(recipient).handle(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = this.#balances
      .set(L.sender, fromBalance.subtract(amount))
      .set(recipient, recipientBalance.add(amount))
    yield* L.set(this.#balances, updated)
    yield new TransferEvent({
      from: L.caller,
      to: recipient,
      value: amount,
    })
  }

  *allowance(owner: Owner, spender: Spender) {
    const spenderAllowances = yield* this.#allowances.get(owner).unhandle(L.None)
    return spenderAllowances.get(spender)
  }

  *approve(spender: Spender, amount: L.u256) {
    const ownerAllowedBy = yield* this.#allowances.get(L.caller).handle(L.None, function*() {
      return new AllowedBy()
    })
    const spenderAllows = yield* ownerAllowedBy.get(spender).handle(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = this.#allowances.set(
      L.caller,
      ownerAllowedBy.set(spender, spenderAllows.add(amount)),
    )
    yield* L.set(this.#allowances, updated)
  }

  *transferFrom(sender: L.id, recipient: L.id, amount: L.u256) {
    const recipientAllowances = yield* this.#allowances.get(recipient).unhandle(L.None)
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
