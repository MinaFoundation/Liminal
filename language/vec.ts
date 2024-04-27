import { Native, top, type } from "./type.js"

export type VecNative<E extends top> = Native<E>[]

export function vec<E extends top>(elementType: E) {
  return class extends type("vec")<VecNative<E>> {
    readonly elementType = elementType
  }
}
