import { Spec } from "./Context.js"
import { pk } from "./pk.js"

export declare const sender: pk

export declare function ref<S extends Spec>(spec: S, key: pk): S
