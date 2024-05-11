import { Effect } from "../Effect/Effect.js"
import { Type } from "../Type/Type.js"

export type State<T extends Type = any> = {
  (): T
  (newValue: T): Effect<never, T>
  (f: (oldValue: T) => T): Effect<never, T>
}
