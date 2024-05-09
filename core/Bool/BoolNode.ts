import { ConstructorNode, TypeNode } from "../Node.js"
import { Type } from "../Type/Type.js"
import { bool } from "./Bool.js"

export class TrueNode extends ConstructorNode("true")<bool> {
  constructor() {
    super(bool)
  }
}

export class FalseNode extends ConstructorNode("false")<bool> {
  constructor() {
    super(bool)
  }
}

export class NotNode extends TypeNode("not")<bool> {}

export class AssertNode<E extends Type> extends TypeNode("Assert")<E> {
  constructor(readonly truthy: bool, readonly error: E) {
    super(error)
  }
}
