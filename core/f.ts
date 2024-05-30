import { unimplemented } from "../util/unimplemented.ts"
import { Result, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { State } from "./State.ts"
import { Factory } from "./Type.ts"
import { Union } from "./Union.ts"

export function f<R extends Result, U extends UseFieldTypes>(
  _use: U,
  _f: (props: UseResult<U>) => R,
): (props: Props<U>) => R
export function f<
  Y extends Yield,
  R extends Result,
  U extends UseFieldTypes,
>(_use: U, _f: (props: UseResult<U>) => Generator<Y, R>): (props: Props<U>) => Effect<Y, R>
export function f<Y extends Yield, R extends Result, U extends UseFieldTypes>(
  _use: U,
  _f: (props: UseResult<U>) => R | Generator<Y, R>,
): (props: Props<U>) => R | Effect<Y, R> {
  unimplemented()
}

export type Props<U extends UseFieldTypes> = {
  [K in keyof U as U[K] extends Factory ? K : never]: Union.Unwrap<
    InstanceType<Extract<U[K], Factory>>
  >
}
export type UseField = Factory | State
export type UseFieldTypes = Record<string, UseField>
export type UseFields<F extends UseFieldTypes = any> = {
  [K in keyof F as F[K] extends State ? never : K]: InstanceType<Exclude<F[K], State>>
}
export type UseResult<F extends UseFieldTypes> = {
  [K in keyof F]: Union.Unwrap<
    F[K] extends State<infer T> ? T : F[K] extends Factory<infer T> ? T : never
  >
}
