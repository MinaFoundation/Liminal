import { ConstructorNode } from "../Node.js"
import { Type } from "../Type/Type.js"
import { Struct } from "./Struct.js"

export class StructFieldNode<T extends Type> extends ConstructorNode("StructField")<T> {
  constructor(readonly struct: Struct, type: new() => T) {
    super(type)
  }
}
