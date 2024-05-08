import { Result, Type } from "../core/mod.js"
import { SignalOptions } from "../util/AbortController.js"
import { Subscription } from "../util/Subscription.js"

export declare function Client(...bootNodes: string[]): Promise<Client>

export interface Client extends Disposable {
  send<R extends Result>(
    tx: () => Generator<unknown, R>,
    options: SignalOptions,
  ): Subscription<TxStatus<Type.Native<R>>>
}

export interface TxBroadcast {
  type: "Broadcasted"
  peers: string[]
}
export interface TxInclusion<R> {
  type: "Included"
  block: string
  result: R
}
export interface TxFinalization<R> {
  type: "Finalized"
  block: string
  result: R
}
export interface TxRejection {
  type: "Rejected"
  reason: TxRejectionReason
}

export type TxStatus<R> = TxBroadcast | TxInclusion<R> | TxFinalization<R> | TxRejection

// TODO
export type TxRejectionReason =
  | { type: "SeeingAnotherTx" }
  | { type: "LackingRizz" }
  | { type: "Impossible" }
  | {
    type: "SystemError"
    value: "A" | "B" | "C"
  }
