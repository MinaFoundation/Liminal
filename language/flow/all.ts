import { U2I } from "../../util/U2I.js"
import { Effect } from "../Effect.js"

export declare function all<I extends Effect<any, any>[]>(...items: I): Effect<
  { [K in keyof I]: I[K] extends Effect<infer T, infer _U> ? T : I[K] },
  I[number] extends Effect<any, infer X> ? U2I<X> : never
>
export declare function all<F extends Record<keyof any, Effect<any, any>>>(fields: F): Effect<
  { [K in keyof F]: F[K] extends Effect<infer T, infer _U> ? T : F[K] },
  F[keyof F] extends Effect<any, infer X> ? U2I<X> : never
>
