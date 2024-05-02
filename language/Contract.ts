import { f } from "./f.js"
import { id } from "./id.js"
import { state } from "./state.js"
import { Any } from "./type.js"

// TODO: narrow
export type Spec = Record<string, any>
export type StateTypes = Record<string, Any>

export type Contract<S extends Spec> = {
  // TODO: why doesn't `state` work as a constraint
  [K in keyof S as S[K] extends f ? K : S[K] extends state<infer _> ? K : never]: S[K] extends
    f<infer A, infer Y, infer O> ? (
      ...args: A
    ) => Generator<[Y], O>
    : S[K] extends state<infer _> ? InstanceType<S[K]>
    : never
}

export interface Context {
  sender: id
}

export interface ContractContext extends Context {
  contract: id
}
