import { Result, Value } from "../core/mod.ts"
import { SignalOptions } from "../util/AbortController.ts"
import { Subscription } from "../util/Subscription.ts"
import { unimplemented } from "../util/unimplemented.ts"

export declare function client(...bootNodes: string[]): Promise<Client>

export class Client implements Disposable {
  send<R extends Result>(
    _tx: () => Generator<unknown, R>,
    _options: SignalOptions,
  ): Subscription<TxStatus<Value.Native<R>>> {
    unimplemented()
  }

  // TODO
  [Symbol.dispose]() {}
}

export interface TxBroadcast {
  tag: "Broadcasted"
  peers: string[]
}
export interface TxInclusion<R> {
  tag: "Included"
  block: string
  result: R
}
export interface TxFinalization<R> {
  tag: "Finalized"
  block: string
  result: R
}
export interface TxRejection {
  tag: "Rejected"
  reason: TxRejectionReason
}

export type TxStatus<R> = TxBroadcast | TxInclusion<R> | TxFinalization<R> | TxRejection

// TODO
export type TxRejectionReason =
  | { tag: "SeeingAnotherTx" }
  | { tag: "LackingRizz" }
  | { tag: "Impossible" }
  | {
    tag: "SystemError"
    value: "A" | "B" | "C"
  }
