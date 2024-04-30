import { Effect } from "./Effect.js"
import { pk } from "./pk.js"
import { Any } from "./type.js"

export interface Dep<K extends keyof any, T> extends Effect<T, { dep: { [_ in K]: T } }> {}

export declare function dep<K extends keyof any, T extends Any>(
  name: K,
  type: T,
): Dep<K, InstanceType<T>>

// builtins ...
// TODO: make conflict resistant

export const sender = dep("sender", pk)
