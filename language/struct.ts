import { Any, Type, TypeNative, Value } from "./type.js"

export type Fields = Record<string, Any>

export type StructNative<M extends Fields> = {
  [K in keyof M]: TypeNative<M[K]>
}

export function struct<F extends Fields>(fieldTypes: F) {
  return class Instance extends Type("struct", { fieldTypes })<StructNative<F>> {
    declare fields: {
      [K in keyof F]: InstanceType<F[K]>
    }

    static from(fields: { [K in keyof F]: Value<F[K]> }) {
      return new Instance(fields)
    }
  }
}
