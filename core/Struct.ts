import { Flatten } from "../util/Flatten.ts"
import { isKey } from "../util/isKey.ts"
import { Setter } from "../util/Setter.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Key } from "./Key.ts"
import { Factory, Type, TypeSource } from "./Type.ts"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<const F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct")<StructSource, StructNative<F>, StructFrom<F>> {
    fieldTypes = fieldTypes
    fields = Object.fromEntries(
      Object.entries(fieldTypes).map(([key, type]) => [
        key,
        new (isKey(type) ? Key(type) : type)(
          new TypeSource.StructField(this, key),
        ),
      ]),
    ) as Fields<F>

    // TODO: clean up typing
    set<
      T,
      V extends ValueFields<F>,
      K extends keyof V,
    >(
      this: T,
      _key: K,
      _setter: Setter<InstanceType<V[K]>>,
    ): T {
      unimplemented()
    }
  }
}

export type FieldType = keyof any | Factory
export type FieldTypes = Record<string, FieldType>

export type ValueFields<F extends FieldTypes> = Extract<
  Record<any, Factory>,
  { [K in keyof F as F[K] extends Factory ? K : never]: F[K] }
>

export type Fields<F extends FieldTypes = any> = {
  -readonly [K in keyof F]: F[K] extends keyof any ? Key<F[K]>
    : F[K] extends Factory ? InstanceType<F[K]>
    : never
}

export type StructFrom<F extends FieldTypes = any> = F extends Record<string, keyof any> ? undefined
  : {
    -readonly [K in keyof F as F[K] extends Factory ? K : never]: F[K] extends Factory<infer T>
      ? T | Type.Native<T>
      : never
  }

type StructNativeField<T> = T extends Factory<infer U> ? Type.Native<U> : T
export type StructNative<F extends FieldTypes> = Flatten<
  { -readonly [K in keyof F]: StructNativeField<F[K]> }
>

export type StructField<T> = T extends keyof any ? Key<T>
  : T extends Factory ? InstanceType<T>
  : never

export type StructSource = never
