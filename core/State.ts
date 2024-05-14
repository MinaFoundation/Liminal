import { Effect } from "./Effect.ts"
import { Factory, Type } from "./Type.ts"

export type State<T extends Type = any> = {
  tag: "State"
  type: Factory<T>
  (): Effect<never, T>
  (newValue: T): Effect<never, T>
  (f: (oldValue: T) => T): Effect<never, T>
}

export function State<T extends Type>(type: Factory<T>): State<T> {
  const state: State<T> = Object.assign(
    (maybeValueOrF?: ValueOrF<T>): Effect<never, T> => {
      return new GetState(state, maybeValueOrF)
    },
    { tag: "State" as const, type },
  )
  return state
}

export class GetState<T extends Type> extends Effect<never, T> {
  result
  constructor(readonly state: State<T>, readonly valueOrF?: ValueOrF<T>) {
    super()
    this.result = new state.type(this)
  }
}

export type ValueOrF<T> = T | ((value: T) => T)
