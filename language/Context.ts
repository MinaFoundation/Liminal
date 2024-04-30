import { Hash } from "./Hash.js"
import { item } from "./item.js"
import { Method } from "./method.js"
import { pk } from "./pk.js"
import { Any } from "./type.js"

export type Spec = Record<string, Any | Method>
export type StateTypes = Record<string, Any>

export type Methods<S extends Spec> = {
  [K in keyof S as S[K] extends Method ? K : never]: S[K] extends Method<infer I, infer Y, infer O>
    ? ((
      input: InstanceType<I>,
    ) => InstanceType<O> | Generator<[Y] extends [never] ? unknown : Y, InstanceType<O>, unknown>)
    : never
}

export type State<S extends Spec, F extends keyof any> = {
  [K in keyof S as S[K] extends item ? K : never]: S[K] extends item<infer T> ?
      & {
        clone(): InstanceType<T>
        hash(): Hash
      }
      & ([F] extends [never] ? {
          set(value: InstanceType<T>): InstanceType<T>
        }
        : {})
    : never
}

// TODO: blend into StateMap

export interface Intrinsics {
  ref<S extends Spec, K extends keyof any>(spec: S, key: K): Contract<S, K>
  sender: pk
}

export declare function impl<S extends Spec>(spec: S): ContractCtor<S>

export type ContractCtor<S extends Spec> = new(methods: Methods<S>) => Contract<S, never>

export type Contract<S extends Spec, K extends keyof any> =
  & Methods<S>
  & State<S, K>
  & ([K] extends [never] ? Intrinsics : {})
