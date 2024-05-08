import { ConstructorNode } from "../Node.js"
import { Constructor } from "../Type/Type.js"
import { Struct, StructOfFields } from "./Struct.js"

export class StructOfNode<T extends Struct> extends ConstructorNode("StructOf")<T> {
  constructor(
    struct: Constructor<T>,
    readonly fields: StructOfFields<T[""]["metadata"]["fieldTypes"]>,
  ) {
    super(struct)
  }
}
