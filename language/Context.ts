import { Hash } from "./Hash.js"
import { Method } from "./method.js"
import { pk } from "./pk.js"
import { item } from "./state.js"
import { Any } from "./type.js"

export type Spec = Record<string, Any | Method>
export type StateTypes = Record<string, Any>

export type ContractProps<S extends Spec> = {
  [K in keyof S as S[K] extends Method ? K : never]: S[K] extends Method<infer I, infer Y, infer O>
    ? ((
      this: Contract<S>,
      input: InstanceType<I>,
    ) => Generator<[Y] extends [never] ? unknown : Y, InstanceType<O>, unknown>)
    : never
}

export type State<S extends Spec> = {
  [K in keyof S as S[K] extends item ? K : never]: S[K] extends item<infer T> ?
      & {
        value(): InstanceType<T>
        hash(): Hash
      }
      & (["TODO"] extends ["TODO"] ? {
          set(value: InstanceType<T>): Generator<never, InstanceType<T>>
        }
        : {})
    : never
}

// TODO: blend into StateMap

export interface Intrinsics {
  ref<S extends Spec, K extends keyof any>(spec: S, key: K): Contract<S>
  sender: pk
  deploy(): "TODO"
}

export declare function impl<S extends Spec>(spec: S): ContractCtor<S>

export type ContractCtor<S extends Spec> = new(
  methods: ContractProps<S>,
) => Contract<S>

export type Contract<S extends Spec = Spec> =
  & ContractProps<S>
  & State<S>
  & Intrinsics
