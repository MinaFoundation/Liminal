import { Result, Type } from "../core/mod.ts"
import { SignalOptions } from "../util/AbortController.ts"
import { Subscription } from "../util/Subscription.ts"

export declare function Client(...bootNodes: string[]): Promise<Client>

export interface Client extends Disposable {
  send<R extends Result>(
    tx: () => Generator<unknown, R>,
    options: SignalOptions,
  ): Subscription<TxStatus<Type.Native<R>>>
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
