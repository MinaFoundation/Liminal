import { Result, Statements } from "../core/Call.ts"
import { SignerRequirement } from "../core/Id.ts"
import { Value } from "../core/Value.ts"
import { SignalOptions } from "../util/AbortController.ts"
import { Subscription } from "../util/Subscription.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Client, TxBroadcast, TxFinalization, TxInclusion, TxStatus } from "./Client.ts"

export function tx<R extends Result>(f: R | (() => R)): Tx<never, R>
export function tx<Y extends Value, R extends Result>(
  f: Generator<Y, R> | (() => Generator<Y, R>),
): Tx<Y, R>
export function tx(value: any) {
  return new Tx(value)
}

export class Tx<Y extends Value, R extends Result> {
  constructor(readonly statements: Statements<{}, [], Y, R>) {}

  sign(senderSigner: SignBytes, ...maybeSigners: MaybeTxSigners<Y>): SignedTx<Y, R> {
    return new SignedTx(this, senderSigner, ...maybeSigners)
  }
}

export type MaybeTxSigners<Y> = [Extract<Y, SignerRequirement>] extends [never] ? [] : [
  signers: { [K in Extract<Y, SignerRequirement>["key"]]: SignBytes },
]
export type SignBytes = (bytes: Uint8Array) => Uint8Array

export class SignedTx<Y extends Value, R extends Result> {
  signers
  constructor(
    readonly tx: Tx<Y, R>,
    readonly senderSigner: SignBytes,
    ...[signers]: MaybeTxSigners<Y>
  ) {
    this.signers = signers
  }

  run(_handler?: TxHandler<Y>): TxRun<Y, R> {
    return new TxRun(this)
  }
}

export type TxHandler<Y extends Value> = (
  value: Value.Native<Exclude<Y, SignerRequirement>>,
) => void

export class TxRun<Y extends Value, R extends Result> {
  constructor(readonly signedTx: SignedTx<Y, R>) {}

  commit(_chain: Client, _options?: CommitOptions): Commit<Value.Native<R>> {
    unimplemented()
  }
}

export interface CommitOptions extends SignalOptions {}

// TODO: should `included` and `finalized` include the tx result value in the case that the tx generator returns a value?
export interface Commit<R> extends Subscription<TxStatus<R>> {
  broadcasted(): Promise<TxBroadcast>
  included(): Promise<TxInclusion<R>>
  finalized(): Promise<TxFinalization<R>>
}
