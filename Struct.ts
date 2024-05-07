import { Constructor, Type, type } from "./Type.js"

export type Fields = Record<string, Constructor>

// TODO: do we want to parameterize the conversions?
// TODO: enable tuple structs
export interface Struct<F extends Fields = Fields>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<F extends Fields>(fieldTypes: F) {
  return class extends type("Struct", { fieldTypes })<StructNative<F>, never, never> {
    // TODO:
    declare fields: {
      [K in keyof F]: InstanceType<F[K]>
    }
  }
}

export type StructNative<F extends Fields> = {
  [K in keyof F]: Type.Native<InstanceType<F[K]>>
}
