import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { Factory, Type } from "./Type.ts"

export type State<T extends Type = any> = {
  type: "State"
  (): Effect<never, T>
  (newValue: T): Effect<never, T>
  (f: (oldValue: T) => T): Effect<never, T>
}

export function State<T extends Type>(_type: Factory<T>): State<T> {
  return Object.assign(
    { type: "State" },
    (_valueOrF: T | ((oldValue: T) => T)): Effect<never, T> => {
      unimplemented()
    },
  ) as State<T>
}
