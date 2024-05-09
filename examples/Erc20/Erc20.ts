import * as L from "liminal"

export class Balances extends L.MerkleMap(L.id, L.u256) {}
export class Allowances extends L.MerkleMap(L.id, Balances) {}

export class Erc20 {
  totalSupply_ = new L.State(L.u256)
  balances_ = new L.State(Balances)
  allowances_ = new L.State(Allowances)
  name_ = new L.State(L.String)
  symbol_ = new L.State(L.String)

  name() {
    return this.name_
  }

  symbol() {
    return this.symbol_
  }

  decimals() {
    return L.u8.from(18)
  }

  totalSupply() {
    return this.totalSupply_
  }

  balanceOf(account: L.id) {
    return this.balances_.value.get(account)
  }

  *transfer(recipient: L.id, value: L.u256) {
    yield* this.transfer_(L.sender, recipient, value)
    return L.true
  }

  allowance(owner: L.id, spender: L.id) {
    return this.allowances_.value.get(owner).when(Balances, function*(allowance) {
      return allowance.get(spender)
    })
  }

  *approve(spender: L.id, amount: L.u256) {
    yield* this.approve_(L.sender, spender, amount)
    return L.true
  }

  *transferFrom(sender: L.id, recipient: L.id, amount: L.u256) {
    const recipientAllowances = yield* this.allowances_.value.get(recipient).unhandle(L.None)
    const recipientAllowanceFromSender = yield* recipientAllowances.get(sender).unhandle(L.None)
    yield recipientAllowanceFromSender.gte(amount).assert(Erc20Error.InsufficientBalance.of({}))
  }

  *transfer_(from: L.id, to: L.id, value: L.u256) {
    const senderBalance = yield* this.balances_.value
      .get(from)
      .unhandle(L.None, Erc20Error.InsufficientBalance.of({}))
    yield senderBalance
      .gte(value)
      .assert(Erc20Error.InsufficientBalance.of({}))
    const recipientBalance = this.balances_.value.get(to).when(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = this.balances_.value
      .set(from, senderBalance.subtract(value))
      .set(to, recipientBalance.add(value))
    yield* this.balances_.set(updated)
    yield Erc20Event.Transfer.of({ from, to, value })
  }

  *approve_(owner: L.id, spender: L.id, amount: L.u256) {
    yield this.assertNotNullAddress(owner)
    yield this.assertNotNullAddress(spender)

    const ownerApprovals = this.allowances_.value.get(owner).when(L.None, function*() {
      return new Balances()
    })
    const spenderAllowanceUpdated = ownerApprovals
      .get(spender)
      .when(L.u256, function*(v) {
        return v.add(amount)
      })
      .when(L.None, function*() {
        return amount
      })
    const ownerApprovalsUpdated = ownerApprovals.set(spender, spenderAllowanceUpdated)
    const allowancesUpdated = this.allowances_.value.set(owner, ownerApprovalsUpdated)
    yield* this.allowances_.set(allowancesUpdated)
  }

  private assertNotNullAddress(inQuestion: L.id) {
    return inQuestion.equals(L.id.null).not().assert(Erc20Error.InvalidApprover.of({}))
  }
}

export namespace Erc20Event {
  export class Transfer extends L.Struct("Transfer", {
    from: L.id,
    to: L.id,
    value: L.u256,
  }) {}

  export class Approval extends L.Struct("Approval", {
    owner: L.id,
    spender: L.id,
    value: L.u256,
  }) {}
}

export namespace Erc20Error {
  export class InvalidApprover extends L.Struct("InvalidApprover", {}) {}
  export class InvalidSpender extends L.Struct("InvalidSpender", {}) {}
  export class InsufficientBalance extends L.Struct("InsufficientBalanceError", {}) {}
}
