import { SignalOptions } from "util/AbortController.js"
import { Client, TxBroadcast, TxFinalization, TxInclusion, TxStatus } from "../../client/Client.js"
import { Subscription } from "../../util/Subscription.js"
import { Result, Yield } from "../Effect/Effect.js"
import { SignerRequirement } from "../Id/Id.js"
import { Type } from "../Type/Type.js"

export function tx<Y extends Yield, R extends Result>(f: () => Generator<Y, R>) {
  return new Tx<Y, R>(f)
}

export class Tx<Y extends Yield, R extends Result> {
  constructor(readonly f: () => Generator<Y, R>) {}

  sign(senderSigner: SignBytes, ...maybeSigners: MaybeTxSigners<Y>): SignedTx<Y, R> {
    return new SignedTx(this, senderSigner, ...maybeSigners)
  }
}

export type MaybeTxSigners<Y> = [Extract<Y, SignerRequirement>] extends [never] ? [] : [
  signers: { [K in Extract<Y, SignerRequirement>["key"]]: SignBytes },
]
export type SignBytes = (bytes: Uint8Array) => Uint8Array

export class SignedTx<Y extends Yield, R extends Result> {
  signers
  constructor(
    readonly tx: Tx<Y, R>,
    readonly senderSigner: SignBytes,
    ...[signers]: MaybeTxSigners<Y>
  ) {
    this.signers = signers
  }

  run(handler?: TxHandler<Y>): TxRun<Y, R> {
    return new TxRun(this)
  }
}

export type TxHandler<Y extends Yield> = (value: Type.Native<Exclude<Y, SignerRequirement>>) => void

export class TxRun<Y extends Yield, R extends Result> {
  constructor(readonly signedTx: SignedTx<Y, R>) {}

  commit(chain: Client, options?: CommitOptions): Commit<Type.Native<R>> {
    throw 0
  }
}

export interface CommitOptions extends SignalOptions {}

// TODO: should `included` and `finalized` include the tx result value in the case that the tx generator returns a value?
export interface Commit<R> extends Subscription<TxStatus<R>> {
  broadcasted(): Promise<TxBroadcast>
  included(): Promise<TxInclusion<R>>
  finalized(): Promise<TxFinalization<R>>
}
