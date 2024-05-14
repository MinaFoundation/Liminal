import { Effect } from "./Effect.ts"
import { Type } from "./Type.ts"

export type State<T extends Type = any> = {
  type: "state"
  (): Effect<never, T>
  (newValue: T): Effect<never, T>
  (f: (oldValue: T) => T): Effect<never, T>
}
