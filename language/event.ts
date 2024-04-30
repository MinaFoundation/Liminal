import { Effect } from "./Effect.js"
import { u8 } from "./int.js"
import { Any } from "./type.js"

export interface Event<K extends keyof any, T> extends Effect<never, { event: { [_ in K]: T } }> {}

export declare function event<K extends keyof any, T>(name: K, value: T): Event<K, T>

function* x() {
  yield* event("A", new u8(1))
  yield* event("B", new u8(1))
}
