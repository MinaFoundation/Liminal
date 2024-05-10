import { Flatten } from "../../util/Flatten.js"
import { const as const_ } from "../Constant/Constant.js"
import { Constructor, Type } from "../Type/Type.js"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<F extends FieldTypes>(fieldTypes: F) {
  return Type.make("Struct", { fieldTypes })<StructNative<F>, Fields<F>>
}

export type FieldTypes = Record<string, Constructor<Type>>

export type Fields<F extends FieldTypes = any> = {
  [K in keyof F as F[K] extends Constructor<const_> ? never : K]: F[K] extends Constructor<Type>
    ? InstanceType<F[K]>
    : never
}

export type StructNative<F extends FieldTypes> = Flatten<
  { [K in keyof F]: F[K] extends Constructor<Type> ? Type.Native<InstanceType<F[K]>> : never }
>
