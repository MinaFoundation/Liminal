import { Constant } from "../Constant/Constant.js"
import { Type } from "../Type/Type.js"
import { FieldType, Struct } from "./Struct.js"

export type StructField<T> = T extends keyof any ? Constant<T>
  : T extends (new() => Type) ? InstanceType<T>
  : never

export class StructFieldNode<T extends FieldType> {
  readonly type = "StructFieldNode"
  constructor(readonly struct: Struct, readonly fieldType: T) {}

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
