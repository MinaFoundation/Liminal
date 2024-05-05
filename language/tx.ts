import { id } from "./id.js"

export function tx<Y, O>(f: (this: TxContext) => Generator<Y, O>) {
  return new Tx<Y, O>(f)
}

export class Tx<Y, O> {
  constructor(readonly f: (this: TxContext) => Generator<Y, O>) {}
}

export class TxContext {
  sender = id.sender
}
