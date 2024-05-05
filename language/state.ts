import { Effect } from "./Effect.js"
import { Constructor, Type } from "./Type.js"

export class State<T extends Type = any> extends Effect<"state", never, T> {
  constructor(type: Constructor<T>) {
    super("state", type)
  }

  set(value: T): SetState<T> {
    throw 0
  }
}

export class SetState<T extends Type> extends Effect<"SetState", T, T> {
  constructor(self: State<T>, readonly value: T) {
    super("SetState", self)
  }
}
