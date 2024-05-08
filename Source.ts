import { Type } from "./Type.js"

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
    constructor(target: T, readonly right: T) {
      super(target)
    }
  }
}
