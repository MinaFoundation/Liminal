import { Effect } from "../Effect/Effect.js"
import { ConstructorNode } from "../Node.js"
import { Constructor, Type } from "../Type/Type.js"

export class StateNode<T extends Type> extends ConstructorNode("State")<T> {
  constructor(type: Constructor<T>) {
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
