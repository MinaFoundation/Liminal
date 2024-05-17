import { Effect } from "./Effect.ts"
import { Factory, Type } from "./Type.ts"

export type State<T extends Type = any> = {
  (): Effect<never, T>
  (setter: Setter<T>): Effect<never, T>
  tag: "State"
  type: Factory<T>
  fetch: "TODO"
}

export function State<T extends Type>(type: Factory<T>): State<T> {
  const state = Object.assign((setter?: Setter<T>) => {
    return new GetState<T>(state, setter)
  }, {
    tag: "State" as const,
    type,
    fetch: "TODO" as const,
  })
  return state
}

export class GetState<T extends Type> extends Effect<never, T> {
  yields = []
  result
  constructor(readonly state: State<T>, readonly valueOrF?: Setter<T>) {
    super()
    this.result = new state.type(this)
  }
}

export type Setter<T> = T | ((value: T) => T)
