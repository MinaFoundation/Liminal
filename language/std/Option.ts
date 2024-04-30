import { Catch, Effect } from "../Effect.js"
import { enum_ } from "../enum.js"
import { Any, Value } from "../type.js"

export interface OptionType<S extends Any> extends ReturnType<typeof OptionType<S>> {}
export function OptionType<S extends Any>(Some: S) {
  return class extends enum_({
    Some,
    None: null!,
  }) {
    declare unwrap: <E extends Any, K extends keyof any>(
      error: Value<E>,
      handle: K,
    ) => Effect<S, Catch<K, E>>

    declare unwrapOr: (orValue: Value<S>) => InstanceType<S>
  }
}

export interface Option<S extends Any> extends InstanceType<OptionType<S>> {}

export interface Some<T extends Any> extends Option<T> {}
export declare function Some<T extends Any>(type: T, value: Value<T>): Some<T>

export interface None extends Option<Any> {}
export declare const None: None
