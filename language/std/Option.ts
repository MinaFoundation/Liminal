import { Enum, enum_ } from "../enum.js"
import { u8 } from "../int.js"
import { Any, Native } from "../type.js"

export interface Option<S extends Any> extends
  Enum<{
    Some: S
    None: never
  }>
{
  unwrapOr: UnwrapOr<S>
}
export function Option<S extends Any>(Some: S): Option<S> {
  return class extends enum_({
    Some,
    None: null!,
  }) {
    unwrapOr: UnwrapOr<S>
  }
}

export type UnwrapOr<S extends Any> = <O>(
  this: Option<S>,
  orValue: InstanceType<S>,
) => O

export declare function Some<T extends Any>(
  type: T,
  value: Native<T>,
): Option<T>

export declare const None: Option<Any>

const x = Some(u8, 1)
