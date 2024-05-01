import { method } from "./method.js"
import { state } from "./state.js"
import { Any } from "./type.js"

export type Spec = Record<string, Any | method>
export type StateTypes = Record<string, Any>

export type Contract<S extends Spec> = {
  [K in keyof S as S[K] extends method ? K : never]: S[K] extends method<infer I, infer Y, infer O>
    ? ((
      input: InstanceType<I>,
    ) => Generator<InstanceType<Y>, InstanceType<O>>)
    : S[K] extends state ? InstanceType<S[K]>
    : never
}
