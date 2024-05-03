import { Type } from "./Type.js"

export type Fields = Record<string, new(...args: any) => Type>

// TODO: do we want to parameterize the conversions?
export function Struct<F extends Fields>(fieldTypes: F) {
  return class extends Type<"Struct", StructNative<F>, { fieldTypes: F }, never, never> {
    constructor() {
      super("Struct", { fieldTypes })
    }
  }
}

export type StructNative<F extends Fields> = {
  [K in keyof F]: Type.Native<InstanceType<F[K]>>
}
