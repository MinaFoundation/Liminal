import { Native, top, Type } from "./type.js"

export type VecNative<E extends top> = Native<E>[]

export type vec<E extends top> = ReturnType<typeof vec<E>>
export function vec<E extends top>(elementType: E) {
  return class extends Type("vec", { elementType })<VecNative<E>> {
    *push<T extends top>(value: T) {}
  }
}
