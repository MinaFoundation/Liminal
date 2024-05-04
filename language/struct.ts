import { Native, Type, TypeConstructor } from "./Type.js"

export type Fields = Record<string, TypeConstructor>

// TODO: do we want to parameterize the conversions?
// TODO: enable tuple structs
export function Struct<F extends Fields>(fieldTypes: F) {
  return class extends Type<"Struct", StructNative<F>, { fieldTypes: F }, never, never> {
    declare fields: {
      [K in keyof F]: InstanceType<F[K]>
    }

    constructor() {
      super("Struct", { fieldTypes })
    }
  }
}

export type StructNative<F extends Fields> = {
  [K in keyof F]: Native<InstanceType<F[K]>>
}
