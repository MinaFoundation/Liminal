import { Flatten } from "../util/Flatten.ts"
import { Constant } from "./Constant.ts"
import { Type } from "./Type.ts"

export interface Struct<F extends FieldTypes = any>
  extends InstanceType<ReturnType<typeof Struct<F>>>
{}

export function Struct<const F extends FieldTypes>(fieldTypes: F) {
  return class extends Type.make("Struct", { fieldTypes })<StructNative<F>, Fields<F>> {
    fields = Object.fromEntries(
      Object.entries(fieldTypes).map((
        [key, type],
      ) => [key, new StructFieldNode(this, type).instance()]),
    ) as Fields<F>
  }
}

export type FieldType = keyof any | (new() => Type)
export type FieldTypes = Record<string, FieldType>

export type Fields<F extends FieldTypes = any> = F extends Record<string, keyof any> ? undefined
  : {
    -readonly [K in keyof F as F[K] extends new() => Type ? K : never]: F[K] extends
      (new() => infer T extends Type) ? T | Type.Native<T>
      : never
  }

type StructNativeField<T> = T extends (new() => infer U extends Type) ? Type.Native<U> : T
export type StructNative<F extends FieldTypes> = Flatten<
  { -readonly [K in keyof F]: StructNativeField<F[K]> }
>

export type StructField<T> = T extends keyof any ? Constant<T>
  : T extends (new() => Type) ? InstanceType<T>
  : never

export class StructFieldNode<T extends FieldType> {
  readonly type = "StructFieldNode"
  // TODO: is it worth narrowing `struct`?
  constructor(readonly struct: Type, readonly fieldType: T) {}

  instance(): StructField<T> {
    let instance: Type
    switch (typeof this.fieldType) {
      case "string":
      case "number":
      case "symbol": {
        instance = new (Constant(this.fieldType))()
        break
      }
      case "function": {
        instance = new (this.fieldType as new() => Type)()
        break
      }
      default: {
        throw 0
      }
    }
    instance[""].node = this
    return instance as StructField<T>
  }
}
