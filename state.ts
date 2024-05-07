import { Effect } from "./Effect.js"
import { Type } from "./Type.js"

export class State<T extends Type = any> extends Effect<never, T> {
  constructor(readonly type: new() => T) {
    super()
  }

  set(value: T): Effect<T, T> {
    throw 0
  }
}
