import { bool } from "./Bool/Bool.js"
import { Constructor, Type } from "./Type/Type.js"

export function TypeSource<K extends string>(tag: K) {
  return class<T extends Type> {
    readonly tag = tag
    constructor(readonly target: T) {}

    instance(): T {
      const clone = this.target.clone()
      clone[""].source = this
      return clone
    }
  }
}

export function BinaryOperationSource<K extends string>(tag: K) {
  return class<T extends Type> extends TypeSource(tag)<T> {
    constructor(left: T, readonly right: T) {
      super(left)
    }
  }
}

export function ConstructorSource<K extends string>(tag: K) {
  return class<T extends Type> {
    readonly tag = tag
    constructor(readonly type: Constructor<T>) {}

    instance(): T {
      const instance = new this.type()
      instance[""].source = this
      return instance
    }
  }
}
export function StaticConstructorSource<K extends string, T extends Type>(
  tag: K,
  type: Constructor<T>,
) {
  return class extends ConstructorSource(tag)<T> {
    constructor() {
      super(type)
    }
  }
}

export function CompareSource<K extends string>(tag: K) {
  return class<T> extends ConstructorSource(tag)<bool> {
    constructor(readonly left: T, readonly right: T) {
      super(bool)
    }
  }
}
