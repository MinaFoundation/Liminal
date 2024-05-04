import { Namespace } from "./Namespace.js"
import { state } from "./state.js"

export type Contract<N extends Namespace> = {
  [K in keyof N]: N[K] extends state<infer T> ? T : N[K]
}
