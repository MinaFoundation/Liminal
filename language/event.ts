import { Effect } from "./Effect.js"
import { Any } from "./type.js"

declare const event_: unique symbol
export type Event<K extends keyof any, T extends Any> = { [event_]: [K, T] }

export declare function event<K extends keyof any, T extends Any>(
  name: K,
  value: InstanceType<T>,
): Effect<void, Event<K, T>>
