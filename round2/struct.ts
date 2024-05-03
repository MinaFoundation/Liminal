import { u64, u8 } from "./int.js"
import { AnyType, Instance, Type } from "./Type.js"

export type Fields = Record<string, AnyType>

export interface struct<F extends Fields>
  extends Type<"struct", { [K in keyof F]: F[K]["native"] }, { fields: F }, Struct<F>, never>
{}
export function struct<F extends Fields>(fields: F): struct<F> {
  return Type("struct", { fields }, Struct)
}

class Struct<F extends Fields> extends Instance<struct<F>> {
  declare someMethod: () => true
}

const x = struct({
  a: u8,
  b: u64,
})
const v = x.lift({
  a: 1,
  b: 2,
})
