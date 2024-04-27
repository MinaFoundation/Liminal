import { NativeType, top, type } from "./type.js"

export type VecNativeType<E extends top> = NativeType<E>[]

export function vec<E extends top>(elementType: E) {
  return class extends type("vec")<VecNativeType<E>> {
    readonly elementType = elementType

    constructor(...elements: VecNativeType<E>) {
      super(elements)
    }
  }
}
