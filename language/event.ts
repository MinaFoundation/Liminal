import { Effect } from "./Effect.js"
import { u8 } from "./int.js"
import { Any, Instance } from "./type.js"

export interface Event<K extends keyof any, T extends Instance>
  extends Effect<never, { event: [K, T] }>
{}

export declare function event<
  K extends keyof any,
  T extends Instance,
>(
  name: K,
  value: T,
): Event<K, T>

function* x() {
  yield* event("", new u8(1))
}
