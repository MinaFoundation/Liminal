import { f } from "./f.js"
import { state } from "./state.js"
import { Type } from "./Type.js"

export type Namespace = Record<string, Type | f | state>
