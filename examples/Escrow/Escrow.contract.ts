import * as L from "liminal"
import { U256Counter } from "liminal/std"

// TODO: remove upon cleanup of F type
type Predicate = L.F<{}, never, L.bool>
declare const Predicate: L.Type<Predicate>

export class Escrow extends L.Struct({
  amount: L.u256,
  recipient: L.id,
  depositor: L.id,
  canWithdraw: Predicate,
  canDestroy: Predicate,
}) {}
export class Escrows extends L.Mapping(L.u256, Escrow) {}
export const escrows = Escrows.new()
export const escrowIds = U256Counter.new(0)

// 1. create a new escrow entry with the `CanWithdraw` and `CanReclaim` call and the value to be released and the party to whom we should release
// 2. when recipient is ready, they can call a method `withdraw` that will call the stored `ShouldRelease` in order to determine whether to actually withdraw

export class WithdrawRejected extends L.Struct({ tag: "WithdrawRejected" }) {}
export class DestroyRejected extends L.Struct({ tag: "DestroyRejected" }) {}

export const create = L.f({
  amount: L.u256,
  depositor: L.id,
  recipient: L.id,
  canWithdraw: Predicate,
  canDestroy: Predicate,
}, function*({ amount, depositor, recipient, canDestroy, canWithdraw }) {
  const depositorSigner = yield* depositor.signer("depositor")
  yield* depositorSigner.send({ amount, to: L.self })
  const escrow = Escrow.new({ amount, recipient, depositor, canDestroy, canWithdraw })
  yield* escrows.assign(escrows.set(yield* escrowIds.next(), escrow))
})

export const withdraw = L.f({ escrowId: L.u256 }, function*({ escrowId }) {})

export const destroy = L.f({ escrowId: L.u256 }, function*({ escrowId }) {})
