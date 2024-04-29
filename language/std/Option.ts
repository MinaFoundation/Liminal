import { enum_ } from "../enum.js"
import { Any, Type } from "../type.js"

export type Option<S extends Any> = ReturnType<typeof Option<S>>
export function Option<S extends Any>(Some: S) {
  return class extends enum_({
    Some,
    None: null!,
  }) {
    unwrapOr<This extends this>(this: This, orValue: InstanceType<S>) {
      return this.match({
        Some(value) {
          return value
        },
        None() {
          return orValue
        },
      })
    }
  }
}

export declare function Some<K extends keyof any, M>(value: Type<K, M>): Option<Type<K, M>>
export declare const None: Option<Any>
