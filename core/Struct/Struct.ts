import { constant } from "../Constant/Constant.js"
import { Constructor, Type } from "../Type/Type.js"
import { StructOfNode } from "./StructNode.js"

export type Fields = Record<string, Type>
export type FieldTypes = Record<string, Constructor<Type>>

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct", { fieldTypes })<
    { [K in keyof F]: Type.Native<InstanceType<F[K]>> }
  > {
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
