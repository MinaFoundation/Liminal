import { enum_ } from "../enum.js"
import { Any, Type } from "../type.js"

export type Result<T extends Any, E extends Any> = ReturnType<typeof Result<T, E>>
export function Result<T extends Any, E extends Any>(
  Value: T,
  Error: E,
) {
  return class extends enum_({ Value, Error }) {}
}

export declare function Value<K extends keyof any, M>(value: Type<K, M>): Result<Type<K, M>, Any>
export declare function Error<K extends keyof any, M>(error: Type<K, M>): Result<Any, Type<K, M>>
