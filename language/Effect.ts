import { MatchArms, Variants } from "./enum.js"
import { Any } from "./type.js"

export interface Effect<T, E> extends Generator<E, T, unknown> {}

const catchKey = Symbol()

export interface Catch<
  T extends Any = Any,
  K extends keyof any = any,
  U extends Any = Any,
> extends Effect<T, { [catchKey]: { [_ in K]: U } }> {}

catch_.name = "catch_"
export function catch_<T extends Any, E>(
  value: Effect<T, E>,
  caught: MatchArms<
    E extends { [catchKey]: infer C extends Variants } ? C : never,
    InstanceType<T>
  >,
): InstanceType<T> {
  throw 0
}

export interface Event<K extends keyof any, T> extends Effect<void, { event: { [_ in K]: T } }> {}
export declare function event<K extends keyof any, T>(name: K, value: T): Event<K, T>

export interface Dep<K extends keyof any, T> extends Effect<T, { dep: { [_ in K]: T } }> {
  key: K
}
export declare function dep<K extends keyof any, T extends Any>(
  name: K,
  type: T,
): Dep<K, InstanceType<T>>
