import { Namespace } from "./Namespace.js"

export type Contract<N extends Namespace> = {
  [K in keyof N]: N[K]
}
