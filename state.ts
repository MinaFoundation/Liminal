import { Effect } from "./Effect.js"
import { Type } from "./Type.js"

export class State<T extends Type = any> extends Effect("state")<never, T> {
  constructor(readonly type: new() => T) {
    super()
  }

  set(value: T): SetState<T> {
    return new SetState(this, value)
  }
}

export class SetState<T extends Type = Type> extends Effect("SetState")<T, T> {
  constructor(readonly self: State<T>, readonly value: T) {
    super()
  }
}
