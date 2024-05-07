import { Subscription } from "util/Subscription.js"
import { Client, TxStatus } from "./Client.js"
import { Result, Yield } from "./Effect.js"
import { signer, SignerRequirement } from "./id.js"
import { source } from "./Source.js"
import { Type } from "./Type.js"

export function tx<Y extends Yield, R extends Result>(f: () => Generator<Y, R>) {
  return new Tx<Y, R>(f)
}

export class Tx<Y extends Yield, R extends Result> {
  constructor(readonly f: () => Generator<Y, R>) {}

  sign(signers: TxSigners<Y>): SignedTx<Y, R> {
    return new SignedTx(this, signers)
  }
}

export type TxSigners<Y> = {
  [K in Extract<Y, SignerRequirement>["key"]]: SignBytes
}
export type SignBytes = (bytes: Uint8Array) => Uint8Array

export class SignedTx<Y extends Yield, R extends Result> {
  constructor(
    readonly tx: Tx<Y, R>,
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

export class TxSender extends source("txSender")<signer<"sender">> {}
export const sender = new TxSender(new (signer("sender"))()).value()
