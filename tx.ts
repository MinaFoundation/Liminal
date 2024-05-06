import { signer } from "./id.js"
import { source } from "./Source.js"

export function tx<Y, R>(f: () => Generator<Y, R>) {
  return new Tx<Y, R>(f)
}

export class Tx<Y, R> {
  constructor(readonly f: () => Generator<Y, R>) {}
}

export class TxSender extends source("txSender")<signer<"sender">> {}
export const sender = new TxSender(new (signer("sender"))()).value()
