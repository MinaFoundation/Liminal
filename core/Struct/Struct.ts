import { Flatten } from "../../util/Flatten.js"
import { const as const_ } from "../Constant/Constant.js"
import { Type } from "../Type/Type.js"
import { StructFieldNode } from "./StructNode.js"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct", { fieldTypes })<StructNative<F>, Fields<F>> {
    readonly fields = Object.fromEntries(
      Object.entries(fieldTypes).map(([key, type]) => [key, new StructFieldNode(this, type)]),
    ) as Fields<F>
  }
}

export type FieldTypes = Record<string, new() => Type>

export type Fields<F extends FieldTypes = any> = {
  [K in keyof F as F[K] extends new() => const_ ? never : K]: F[K] extends new() => Type
    ? InstanceType<F[K]>
    : never
}

export type StructNative<F extends FieldTypes> = Flatten<
  { [K in keyof F]: F[K] extends new() => Type ? Type.Native<InstanceType<F[K]>> : never }
>
