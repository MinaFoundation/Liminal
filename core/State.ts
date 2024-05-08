import { Effect } from "./Effect/Effect.js"
import { Constructor, Type } from "./Type/Type.js"

export class State<T extends Type = any> {
  readonly tag = "State"
  readonly value
  constructor(readonly type: Constructor<T>) {
    this.value = new type()
  }

  set(value: T): Effect<never, T> {
    return new SetState(this, value).instance()
  }
}

export class SetState<T extends Type = any> {
  readonly tag = "SetState"
  constructor(
    readonly state: State<T>,
    readonly value: T,
  ) {}

  instance(): Effect<never, T> {
    throw 0
  }
}
