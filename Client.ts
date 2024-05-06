import { SignalOptions } from "./util/AbortController.js"
import { Subscription } from "./util/Subscription.js"

export interface Client {
  send(tx: Uint8Array, options: SignalOptions): Subscription<TxStatus>
}

export type TxStatus =
  | {
    type: "Broadcasted"
    peers: string[]
  }
  | {
    type: "Included"
    blockHash: Uint8Array
  }
  | {
    type: "Finalized"
    blockHash: Uint8Array
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
