import { Flatten } from "../../util/Flatten.js"
import { constant } from "../Constant/Constant.js"
import { Constructor, Type } from "../Type/Type.js"
import { StructOfNode } from "./StructNode.js"

export type Fields = Record<string, Type>
export type FieldTypes = Record<string, Constructor<Type>>

export interface Struct<K extends string = any, F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<K, F>>>
{}

export function Struct<K extends string, F extends FieldTypes>(tag: K, fieldTypes: F) {
  return class extends Type.make("Struct", { tag, fieldTypes })<StructNative<K, F>> {
    static of<T extends Struct>(
      this: new() => T,
      fields: StructOfFields<F>,
    ): T {
      return new StructOfNode(this, fields).instance()
    }
  }
}

export type StructOfFields<F extends FieldTypes> = {
  [K in keyof F as InstanceType<F[K]> extends constant ? never : K]: InstanceType<F[K]>
}

export type StructNative<K extends string, F extends FieldTypes> = Flatten<{
  tag: K
  value: { [K in keyof F]: Type.Native<InstanceType<F[K]>> }
}>
