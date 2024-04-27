import { NativeType, top, type } from "./type.js"

export type EnumVariantTypes = Record<keyof any, top>

export type EnumNativeType<M extends EnumVariantTypes, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & {
      tag: K
    }
    & ([M[K]] extends [never] ? {} : {
      value: NativeType<M[K]>
    })
}[K]

export { enum_ as enum }
function enum_<M extends EnumVariantTypes>(variantTypes: M) {
  return class extends type("enum")<EnumNativeType<M>> {
    readonly variantTypes = variantTypes

    static from<K extends keyof M>(
      tag: K,
      ...[value]: [M[K]] extends [never] ? [] : [value: NativeType<M[K]>]
    ) {
      return new this({ tag, ...value ? { value } : {} } as never)
    }

    constructor(value: EnumNativeType<M>) {
      super(value)
    }
  }
}
enum_.name = "enum"
