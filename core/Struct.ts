import { Flatten } from "../util/Flatten.ts"
import { isKey } from "../util/isKey.ts"
import { Constant } from "./Constant.ts"
import { Factory, Type, TypeSource } from "./Type.ts"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<const F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct")<StructSource, StructNative<F>, Fields<F>> {
    fieldTypes = fieldTypes

    fields = Object.fromEntries(
      Object.entries(fieldTypes).map(([key, type]) => [
        key,
        new (isKey(type) ? Constant(type) : type)(
          new TypeSource.StructField({ struct: this, key }),
        ),
      ]),
    ) as Fields<F>
  }
}

export type FieldType = keyof any | Factory
export type FieldTypes = Record<string, FieldType>

export type Fields<F extends FieldTypes = any> = F extends Record<string, keyof any> ? undefined
  : {
    -readonly [K in keyof F as F[K] extends Factory ? K : never]: F[K] extends Factory<infer T>
      ? T | Type.Native<T>
      : never
  }

type StructNativeField<T> = T extends Factory<infer U> ? Type.Native<U> : T
export type StructNative<F extends FieldTypes> = Flatten<
  { -readonly [K in keyof F]: StructNativeField<F[K]> }
>

export type StructField<T> = T extends keyof any ? Constant<T>
  : T extends Factory ? InstanceType<T>
  : never

export type StructSource = never
