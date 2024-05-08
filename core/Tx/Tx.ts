import { SignalOptions } from "util/AbortController.js"
import { Client, TxStatus } from "../../client/Client.js"
import { Subscription } from "../../util/Subscription.js"
import { Result, Yield } from "../Effect/Effect.js"
import { SignerRequirement } from "../Id/Id.js"
import { Type } from "../Type/Type.js"

export function tx<Y extends Yield, R extends Result>(f: () => Generator<Y, R>) {
  return new Tx<Y, R>(f)
}

export class Tx<Y extends Yield, R extends Result> {
  constructor(readonly f: () => Generator<Y, R>) {}

  sign(senderSigner: SignBytes, signers: TxSigners<Y>): SignedTx<Y, R> {
    return new SignedTx(this, senderSigner, signers)
  }
}

export type TxSigners<Y> = {
  [K in Extract<Y, SignerRequirement>["key"]]: SignBytes
}
export type SignBytes = (bytes: Uint8Array) => Uint8Array

export class SignedTx<Y extends Yield, R extends Result> {
  constructor(
    readonly tx: Tx<Y, R>,
    readonly senderSigner: SignBytes,
    readonly signers: TxSigners<Y>,
  ) {}

  run(handler: TxHandler<Y>): TxRun<Y, R> {
    return new TxRun(this)
  }
}

export type TxHandler<Y extends Yield> = (value: Type.Native<Exclude<Y, SignerRequirement>>) => void

export class TxRun<Y extends Yield, R extends Result> {
  constructor(readonly signedTx: SignedTx<Y, R>) {}

  commit(chain: Client): Subscription<TxStatus> {
    throw 0
  }
}

export interface CommitOptions extends SignalOptions {}
