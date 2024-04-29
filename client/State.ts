import { SignalOptions } from "util/AbortController.js"
import { Paginated } from "util/Paginated.js"

export interface StateRoot extends StateView {
  hash: Uint8Array
  child(key: Uint8Array): Promise<StateView | undefined>
  applyTx(tx: Uint8Array, options?: SignalOptions): Promise<ApplyTxResult>
}

export interface ApplyTxResult {
  result: Uint8Array
  state: StateRoot
}

export interface StateDiff extends State<EntryDiff, StateDiff> {
  current: StateView
  next: StateView
}

export interface StateView extends State<Entry, StateView> {
  value(key: Uint8Array, options?: SignalOptions): Promise<Uint8Array | undefined>
}

export interface State<E, S> extends Disposable {
  entry(key: Uint8Array, options?: SignalOptions): Promise<E | undefined>
  entries(): Paginated<Uint8Array, E>
  prefix(prefix: Uint8Array, options?: SignalOptions): Promise<S | undefined>
  prefixes(length: number): Paginated<Uint8Array, PrefixesPage<S>>
}

export interface PrefixesPage<S> {
  prefix: Uint8Array
  state: S
}

export interface EntryDiff extends Disposable {
  old: Entry | undefined
  new: Entry | undefined
}

export interface Entry extends Disposable {
  key: Uint8Array
  valueHash(): Uint8Array | undefined
  value(options?: SignalOptions): Promise<Uint8Array>
}
