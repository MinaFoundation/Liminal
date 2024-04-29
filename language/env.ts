import { Effect } from "./Effect.js"
import { pk } from "./pk.js"
import { Any } from "./type.js"

declare const dep_: unique symbol
export type Dep<K extends keyof any, T extends InstanceType<Any>> = { [dep_]: [K, T] }

export declare function dep<K extends keyof any, T extends Any>(
  name: K,
  type: T,
): Effect<InstanceType<T>, Dep<K, InstanceType<T>>>

// builtins ...
// TODO: make conflict resistant

export const sender = dep("sender", pk)
