import { bool } from "../Bool/Bool.js"
import { Effect } from "../Effect/Effect.js"
import { ConstructorNode } from "../Node.js"
import { Type } from "./Type.js"

export class FromNode<T extends Type = any> extends ConstructorNode("From")<T> {
  constructor(type: new() => T, readonly value: Type.Native<T> | Type.From<T>) {
    super(type)
  }
}

export class IntoNode<T extends Type = any> extends ConstructorNode("Into")<T> {
  constructor(type: new() => T, readonly from: Type) {
    super(type)
  }
}

export class EqualsNode<T extends Type = any> extends ConstructorNode("Equals")<bool> {
  constructor(readonly left: T, readonly right: T) {
    super(bool)
  }
}

export class StateNode<T extends Type = any> extends ConstructorNode("State")<T> {
  constructor(type: new() => T) {
    super(type)
  }
}

export class SetStateNode<T extends Type = any> {
  readonly tag = "SetState"
  constructor(readonly state: T, readonly value: T) {}

  instance(): Effect<never, T> {
    throw 0
  }
}
