import { signer } from "./id.js"

export declare function tx<Y, O>(f: (this: TxContext) => Generator<Y, O>): Tx<Y, O>

export interface Tx<Y, O> {
  tag: "tx"
  f: (this: TxContext) => Generator<Y, O>
}

export interface TxContext {
  sender: signer
}
