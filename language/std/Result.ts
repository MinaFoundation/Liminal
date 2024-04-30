import { enum_ } from "../enum.js"
import { Any, Type } from "../type.js"

export interface ResultType<T extends Any, E extends Any>
  extends ReturnType<typeof ResultType<T, E>>
{}
export function ResultType<T extends Any, E extends Any>(
  Value: T,
  Error: E,
) {
  return class extends enum_({ Value, Error }) {}
}

export interface Result<T extends Any, E extends Any> extends InstanceType<ResultType<T, E>> {}

export declare function Value<T extends Any>(value: T): Result<T, Any>
export declare function Error<E extends Any>(error: E): Result<Any, E>
