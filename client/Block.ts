import { SignalOptions } from "util/AbortController.js"
import { StateRoot } from "./Chain.js"

export interface Block extends Disposable {
  hash: Uint8Array
  parentHash: Uint8Array
  state: StateRoot
  txRoot: Uint8Array
  txs(options?: SignalOptions): Promise<Uint8Array[]>
}
