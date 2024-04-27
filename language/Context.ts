import { Method } from "./method.js"
import { top } from "./type.js"

export type Spec = Record<string, top | Method>
export type StateTypes = Record<string, top>

export type Methods<S extends Spec, P extends StateTypes> = {
  [K in keyof S as S[K] extends Method ? K : never]: S[K] extends Method<infer I, infer O> ? ((
      this: Context<S, P>,
      input: InstanceType<I>,
    ) => InstanceType<O>)
    : never
}

export type Context<S extends Spec, P extends StateTypes> = Methods<S, P> & P

export declare function impl<S extends Spec, P extends StateTypes>(
  spec: S,
  storage: P,
): new(methods: Methods<S, P>) => Context<S, P>
