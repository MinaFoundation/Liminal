import { Any, Native, Type } from "./type.js"

export type Fields = Record<keyof any, Any>

export type StructNative<M extends Fields> = {
  [K in keyof M]: Native<M[K]>
}

export function struct<F extends Fields>(fieldTypes: F) {
  return Type("struct", { fieldTypes })<StructNative<F>>
}
