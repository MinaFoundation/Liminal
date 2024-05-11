import { Flatten } from "../../util/Flatten.js"
import { Type } from "../Type/Type.js"
import { StructFieldNode } from "./StructNode.js"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<const F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct", { fieldTypes })<StructNative<F>, Fields<F>> {
    fields = Object.fromEntries(
      Object.entries(fieldTypes).map(([key, type]) => [key, new StructFieldNode(this, type)]),
    ) as Fields<F>
  }
}

export type FieldType = keyof any | (new() => Type)
export type FieldTypes = Record<string, FieldType>

type MaybeNoFields<F extends FieldTypes> = [
  keyof { [K in keyof F as F[K] extends new() => Type ? K : never]: any },
] extends [never] ? undefined : never

export type Fields<F extends FieldTypes = any> =
  | MaybeNoFields<F>
  | {
    -readonly [K in keyof F as F[K] extends new() => Type ? K : never]: F[K] extends
      (new() => infer T extends Type) ? T | Type.Native<T>
      : never
  }

type StructNativeField<T> = T extends (new() => infer U extends Type) ? Type.Native<U> : T
export type StructNative<F extends FieldTypes> = Flatten<
  { -readonly [K in keyof F]: StructNativeField<F[K]> }
>
