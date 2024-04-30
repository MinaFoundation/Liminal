import { Catch, Effect, keys } from "../Effect.js"
import { Enum, enum_, EnumType } from "../enum.js"
import { u64, u8 } from "../int.js"
import { Any, Ref } from "../type.js"

// TODO: make aware of `Option`
export interface OptionType<S extends Any> extends
  EnumType<{
    Some: S
    None: never
  }>
{}

// : OptionType<S> // TODO: get explicit return type back and working without breaking methods
export function OptionType<S extends Any>(Some: S) {
  return class extends enum_({
    Some,
    None: null!,
  }) {
    unwrap: Unwrap<S, None>
    unwrapOr: UnwrapOr<S>
  }
}

export interface Option<S extends Any> extends
  Enum<{
    Some: S
    None: never
  }>
{
  unwrap: Unwrap<S, None>
  unwrapOr: UnwrapOr<S>
}

export interface Some<T extends Any> extends Option<T> {}
export declare function Some<T extends Any>(
  type: T,
): (value: Ref<T>) => Some<T>
export interface None extends OptionType<Any> {}
export declare const None: None

export type Unwrap<S extends Any, E extends Any> = <
  R extends [key?: keyof any],
>(
  this: Option<S>,
  error: Ref<E>,
  ...rest: R
) => Effect<
  S,
  Catch<R extends [infer K] ? K : keys["Unwrap"], E>
>

export type UnwrapOr<S extends Any> = (
  this: Option<S>,
  orValue: Ref<S>,
) => InstanceType<S>

// TODO: solve for this signature without the redundancy
const x = Some(u8)(1)
const f = x.expect("Some").catch((x) => {
  return x.match({
    [keys.Expect](value) {
      return new u8(1)
    },
  })
})
const s = x.unwrap(new u8(1), "NoneFound")
const d = s.catch((value) => {
  return value.match({
    NoneFound(value) {
      return new u8(1)
    },
  })
})
const g = x.unwrapOr(1)
const y = x.match({
  None() {
    return new u8(0)
  },
  Some(value) {
    return value
  },
})
