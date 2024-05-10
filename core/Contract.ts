import { State } from "./State/State.js"

export type Contract<N> = {
  [K in keyof N]: N[K] extends State<infer T> ? T : N[K]
}
