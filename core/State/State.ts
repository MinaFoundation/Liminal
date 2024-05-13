import { Type } from "../Type/Type.js"

export type State<T extends Type = any> = {
  type: "state"
  (): T
  (newValue: T): T
  (f: (oldValue: T) => T): T
}
