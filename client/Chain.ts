import { SignalOptions } from "../util/AbortController.js"
import { Subscription } from "../util/Subscription.js"
import { Block } from "./Block.js"
import { StateDiff, StateRoot } from "./State.js"
import { Store } from "./Store.js"

export interface ChainConfig {
  multiaddresses: string[]
  store?: Store
}
export declare function liminal(config: ChainConfig): Mina

export interface Mina extends Chain {
  l2(config: ChainConfig): Chain
}

export interface Chain extends Disposable {
  latestBlock(): Subscription<Block>
  block(blockHash: Uint8Array, options?: SignalOptions): Promise<Block>
  blockHash(number: number, options?: SignalOptions): Promise<Uint8Array>
  tx(tx: Uint8Array): Subscription<TxStatus>
  diff(from: StateRoot, to: StateRoot): StateDiff
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
