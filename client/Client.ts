import { SignalOptions } from "../util/AbortController.js"
import { Subscription } from "../util/Subscription.js"

export declare function Client(...bootNodes: string[]): Promise<Client>

export interface Client extends Disposable {
  send(tx: Uint8Array, options: SignalOptions): Subscription<TxStatus>
}

export type TxStatus =
  | {
    type: "Broadcasted"
    peers: string[]
  }
  | {
    type: "Included"
    block: string
  }
  | {
    type: "Finalized"
    block: string
  }
  | {
    type: "Rejected"
    reason: TxRejectionReason
  }

// TODO
export type TxRejectionReason =
  | { type: "SeeingAnotherTx" }
  | { type: "LackingRizz" }
  | { type: "Impossible" }
  | {
    type: "SystemError"
    value: "A" | "B" | "C"
  }
