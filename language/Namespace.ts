import { F } from "./f.js"
import { State } from "./state.js"
import { Type } from "./Type.js"

export type Namespace = Record<string, (new() => Type) | F | State>
