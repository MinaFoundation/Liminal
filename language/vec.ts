import { Any, Type, TypeNative } from "./type.js"

export type VecNative<E extends Any> = TypeNative<E>[]

export type vec<E extends Any> = ReturnType<typeof vec<E>>
export function vec<E extends Any>(elementType: E) {
  return class extends Type("vec", { elementType })<VecNative<E>> {
    *push<T extends Any>(value: T) {}
  }
}
