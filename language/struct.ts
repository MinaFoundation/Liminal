import { NativeType, top, type } from "./type.js"

export type StructFieldTypes = Record<keyof any, top>

export type StructNativeType<M extends StructFieldTypes> = {
  [K in keyof M]: NativeType<M[K]>
}

export function struct<F extends StructFieldTypes>(fieldTypes: F) {
  return class extends type("struct")<StructNativeType<F>> {
    readonly fieldTypes = fieldTypes

    constructor(fields: StructNativeType<F>) {
      super(fields)
    }
  }
}
