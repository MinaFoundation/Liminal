import { signer } from "./id.js"
import { source } from "./Source.js"

export function tx<Y, O>(f: (this: TxContext) => Generator<Y, O>) {
  return new Tx<Y, O>(f)
}

export class Tx<Y, O> {
  constructor(readonly f: (this: TxContext) => Generator<Y, O>) {}
}

export class TxSender extends source("txSender")<signer<"sender">> {}

export class TxContext {
  sender = new TxSender(new (signer("sender"))()).value()
}
