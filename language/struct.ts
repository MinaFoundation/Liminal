import { Native, top, type } from "./type.js"

export type Fields = Record<keyof any, top>

export type StructNative<M extends Fields> = {
  [K in keyof M]: Native<M[K]>
}

export function struct<F extends Fields>(fieldTypes: F) {
  return class extends type("struct")<StructNative<F>> {
    readonly fieldTypes = fieldTypes
  }
}
