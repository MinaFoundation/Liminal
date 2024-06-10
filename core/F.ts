import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { Factory, Type, TypeSource } from "./Type.ts"
import { Union } from "./Union.ts"

export type Params = Record<any, Factory>
export type ParamsResolved<A extends Params> = { [K in keyof A]: Union.Members<InstanceType<A[K]>> }

export class FInternal<A extends Params, Y extends Yield, R extends Result>
  extends Type.make("F")<never, Uint8Array>
{
  constructor(
    source: TypeSource,
    readonly argTypes: A,
    readonly call: Call<Y, R, [args: ParamsResolved<A>]>,
  ) {
    super(source)
    const call_ = (..._args: any) => {} // TODO
    Object.setPrototypeOf(call_, FInternal.prototype)
    Object.assign(call_, this)
  }
}
export interface F<A extends Params, Y extends Yield, R extends Result> extends FInternal<A, Y, R> {
  (_args: ParamsResolved<A>): Effect<Y, R>
}

export function f<R extends Result>(call: ValueCall<R, []>): F<{}, never, R>
export function f<R extends Result, A extends Params>(
  argTypes: A,
  call: ValueCall<R, [args: ParamsResolved<A>]>,
): F<A, never, R>
export function f<Y extends Yield, R extends Result>(f: GenCall<Y, R, []>): F<{}, Y, R>
export function f<
  Y extends Yield,
  R extends Result,
  A extends Params,
>(
  argTypes: A,
  call: GenCall<Y, R, [args: ParamsResolved<A>]>,
): F<A, Y, R>
export function f<
  Y extends Yield,
  R extends Result,
  A extends Params,
>(
  argTypesOrF: A | Call<Y, R, []>,
  call?: Call<Y, R, [args: ParamsResolved<A>]>,
): F<A, Y, R> {
  if (typeof argTypesOrF === "function") {
    return new FInternal(null!, {} as never, argTypesOrF) as never
  }
  return new FInternal(null!, argTypesOrF as never, call) as never
}
