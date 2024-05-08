import * as L from "liminal"

export function erc20DeploymentTx(deployerId: Uint8Array) {
  return L.tx(function*() {
    const deployer = yield* L.id.from(deployerId).signer("deployer")
    yield* deployer.deploy(new Erc20(), {
      totalSupply_: L.u256.from(1e9),
      balances_: new Balances(),
      allowances_: new Allowances(),
    })
  })
}

export class Erc20 {
  totalSupply_ = new L.State(L.u256)
  balances_ = new L.State(Balances)
  allowances_ = new L.State(Allowances);

  *totalSupply() {
    return this.totalSupply_
  }

  *balanceOf(account: L.id) {
    return this.balances_.value.get(account)
  }

  *transfer(recipient: L.id, amount: L.u256) {
    const fromBalance = yield* this.balances_.value.get(L.sender).unhandle(L.None)
    yield fromBalance.gte(amount).assert(new InsufficientBalanceError({}))
    const recipientBalance = this.balances_.value.get(recipient).when(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = this.balances_.value
      .set(L.sender, fromBalance.subtract(amount))
      .set(recipient, recipientBalance.add(amount))
    yield* this.balances_.set(updated)
    yield new TransferEvent({
      from: L.caller,
      to: recipient,
      value: amount,
    })
  }

  *allowance(owner: Owner, spender: Spender) {
    const spenderAllowances = yield* this.allowances_.value.get(owner).unhandle(L.None)
    return spenderAllowances.get(spender)
  }

  *approve(spender: Spender, amount: L.u256) {
    const ownerAllowedBy = this.allowances_.value.get(L.caller).when(L.None, function*() {
      return new AllowedBy()
    })
    const spenderAllows = ownerAllowedBy.get(spender).when(L.None, function*() {
      return L.u256.from(0)
    })
    const updated = this.allowances_.value.set(
      L.caller,
      ownerAllowedBy.set(spender, spenderAllows.add(amount)),
    )
    yield* this.allowances_.set(updated)
  }

  *transferFrom(sender: L.id, recipient: L.id, amount: L.u256) {
    const recipientAllowances = yield* this.allowances_.value.get(recipient).unhandle(L.None)
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
