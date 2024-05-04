export declare function tx<Y, O>(f: () => Generator<Y, O>): Tx<Y, O>

export interface Tx<Y, O> {
  tag: "tx"
  f: () => Generator<Y, O>
}
