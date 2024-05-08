import { ConstructorNode, TypeNode } from "../Node.js"
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

export class AssertEquals<T extends Type, E extends Type> extends TypeNode("AssertEquals")<E> {
  constructor(error: E, readonly actual: T, readonly expected: T) {
    super(error)
  }
}
