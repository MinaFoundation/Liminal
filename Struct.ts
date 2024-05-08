import { constant } from "./constant.js"
import { Constructor, Type } from "./Type.js"

export type FieldsTypes = Record<string, Constructor>
export type Fields<F extends FieldsTypes> = {
  [K in keyof F as F[K] extends Constructor<constant> ? never : K]: InstanceType<F[K]>
}

// TODO: do we want to parameterize the conversions?
// TODO: enable tuple structs
export interface Struct<F extends FieldsTypes = FieldsTypes>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<F extends FieldsTypes>(fieldTypes: F) {
  return class extends Type.new("Struct", { fieldTypes })<StructNative<F>> {
    constructor(readonly fields: Fields<F>) {
      super()
    }
  }
}

export type StructNative<F extends FieldsTypes> = {
  [K in keyof F]: Type.Native<InstanceType<F[K]>>
}
