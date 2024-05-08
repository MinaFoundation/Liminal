import { ConstructorSource, TypeSource } from "../Source.js"
import { Constructor, Type } from "./Type.js"

export class From<T extends Type> extends ConstructorSource("From")<T> {
  constructor(type: Constructor<T>, readonly value: Type.Native<T> | Type.From<T>) {
    super(type)
  }
}

export class Into<T extends Type> extends ConstructorSource("Into")<T> {
  constructor(type: Constructor<T>, readonly from: Type) {
    super(type)
  }
}

export class AssertEquals<T extends Type, E extends Type> extends TypeSource("AssertEquals")<E> {
  constructor(error: E, readonly actual: T, readonly expected: T) {
    super(error)
  }
}
