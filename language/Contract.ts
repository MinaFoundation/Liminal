import { Namespace } from "./Namespace.js"
import { State } from "./state.js"

export type Contract<N extends Namespace> = {
  [K in keyof N]: N[K] extends State<infer T> ? T : N[K]
}
