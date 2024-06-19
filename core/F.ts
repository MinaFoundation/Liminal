import { unimplemented } from "../util/unimplemented.ts"
import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { Union } from "./Union.ts"
import { Type, Value } from "./Value.ts"

export type Params = Record<any, Type>
export type ParamsResolved<A extends Params> = { [K in keyof A]: Union.Members<InstanceType<A[K]>> }

export interface F<Y extends Yield, R extends Result, A extends Params>
  extends InstanceType<FCtor<Y, R, A>>
{}
export type FCtor<Y extends Yield = any, R extends Result = any, A extends Params = any> =
  ReturnType<typeof FInternal<Y, R, A>>

function FInternal<Y extends Yield, R extends Result, A extends Params>(
  argTypes: A,
  call: Call<Y, R, [args: ParamsResolved<A>]>,
) {
  return class extends Value.make("F")<never, never, FFrom<A>> {
    argTypes = argTypes
    call = call

    run(): [Y] extends [never] ? R : Effect<Y, R> {
      return unimplemented()
    }
  }
}

export function F<R extends Result>(call: ValueCall<R, []>): FCtor<never, R, {}>
export function F<R extends Result, A extends Params>(
  argTypes: A,
  call: ValueCall<R, [args: ParamsResolved<A>]>,
): FCtor<never, R, A>
export function F<Y extends Yield, R extends Result>(call: GenCall<Y, R, []>): FCtor<Y, R, {}>
export function F<
  Y extends Yield,
  R extends Result,
  A extends Params,
>(
  argTypes: A,
  call: GenCall<Y, R, [args: ParamsResolved<A>]>,
): FCtor<Y, R, A>
export function F<
  Y extends Yield,
  R extends Result,
  A extends Params,
>(
  argTypes: A | Call<Y, R, []>,
  call?: Call<Y, R, [args: ParamsResolved<A>]>,
): FCtor<Y, R, A> {
  return (typeof argTypes === "function"
    ? FInternal({}, argTypes)
    : FInternal(argTypes as never, call)) as never
}

export type FFrom<F extends Params> = { [K in keyof F]: Value.Args<[InstanceType<F[K]>]>[0] }
