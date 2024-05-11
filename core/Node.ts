import { bool } from "./Bool/Bool.js"
import { Type } from "./Type/Type.js"

export function TypeNode<K extends string>(type: K) {
  return class<T extends Type> {
    readonly type = type
    constructor(readonly instance_: T) {}

    instance(): T {
      const clone = this.instance_.clone()
      clone[""].node = this
      return clone
    }
  }
}

export function BinaryTypeNode<K extends string>(type: K) {
  return class<T extends Type> extends TypeNode(type)<T> {
    constructor(left: T, readonly right: T) {
      super(left)
    }
  }
}

export function ConstructorNode<K extends string>(type: K) {
  return class<T extends Type> {
    readonly type = type
    constructor(readonly ctor: new() => T) {}

    instance(): T {
      const instance = new this.ctor()
      instance[""].node = this
      return instance
    }
  }
}

export function CompareNode<K extends string>(type: K) {
  return class<T> extends ConstructorNode(type)<bool> {
    constructor(readonly left: T, readonly right: T) {
      super(bool)
    }
  }
}
