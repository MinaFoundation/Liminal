import { Type } from "./Type.js"

export function source<K extends string>(tag: K) {
  return class Source<T extends Type, P = never> {
    readonly tag = tag
    readonly props
    constructor(readonly self: T, ...[props]: [P] extends [never] ? [] : [P]) {
      this.props = props
    }

    value(): T {
      const clone = this.self.clone()
      clone[""].source = this
      return clone
    }
  }
}
