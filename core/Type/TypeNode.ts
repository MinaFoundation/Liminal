import { bool } from "../Bool/Bool.js"
import { ConstructorNode } from "../Node.js"
import { Constructor, Type } from "./Type.js"

export class From<T extends Type> extends ConstructorNode("From")<T> {
  constructor(type: Constructor<T>, readonly value: Type.Native<T> | Type.From<T>) {
    super(type)
  }
}

export class Into<T extends Type> extends ConstructorNode("Into")<T> {
  constructor(type: Constructor<T>, readonly from: Type) {
    super(type)
  }
}

export class EqualsNode<T extends Type> extends ConstructorNode("Equals")<bool> {
  constructor(readonly left: T, readonly right: T) {
    super(bool)
  }
}
