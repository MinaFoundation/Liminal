import { Effect } from "./Effect.ts"
import { Factory, Type } from "./Type.ts"

export type State<T extends Type = any> = {
  (setter: StateSetter<T>): Effect<never, never>
  tag: "State"
  type: Factory<T>
}

export function State<T extends Type>(type: Factory<T>): State<T> {
  const state = Object.assign((setter?: StateSetter<T>) => {
    return new StateEffect<T>(state, setter)
  }, {
    tag: "State" as const,
    type,
  })
  return state
}

export class StateEffect<T extends Type> extends Effect<never, never> {
  declare setter?: StateSetter<T>
  constructor(readonly state: State<T>, setter?: StateSetter<T>) {
    super()
    this.yields = [this as never]
    if (setter) this.setter = setter
  }
}

export type StateSetter<T> = T | ((value: T) => T)
