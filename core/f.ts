import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { Factory, Type, TypeSource } from "./Type.ts"
import { Union } from "./Union.ts"

export type ArgTypes = Record<keyof any, Factory>

export type Args<U extends ArgTypes> = {
  [K in keyof U]: Union.Unwrap<InstanceType<U[K]>>
}

export interface FFrom<A extends ArgTypes, Y extends Yield, R extends Result> {
  argTypes: A
  call: Call<Y, R, [args: Args<A>]>
}

export class FInternal<A extends ArgTypes, Y extends Yield, R extends Result>
  extends Type.make("F")<never, Uint8Array>
{
  constructor(
    source: TypeSource,
    readonly argTypes: A,
    readonly call: Call<Y, R, [args: Args<A>]>,
  ) {
    super(source)
    const call_ = (..._args: any) => {}
    Object.setPrototypeOf(call_, FInternal.prototype)
    Object.assign(call_, this)
  }
}
export interface F<A extends ArgTypes, Y extends Yield, R extends Result>
  extends FInternal<A, Y, R>
{
  (_args: Args<A>): Effect<Y, R>
}

export function f<R extends Result>(call: ValueCall<R, []>): F<{}, never, R>
export function f<
  R extends Result,
  P extends ArgTypes,
>(
  argTypes: P,
  call: ValueCall<R, [args: Args<P>]>,
): F<P, never, R>
export function f<Y extends Yield, R extends Result>(f: GenCall<Y, R, []>): F<{}, Y, R>
export function f<
  Y extends Yield,
  R extends Result,
  P extends ArgTypes,
>(
  argTypes: P,
  call: GenCall<Y, R, [args: Args<P>]>,
): F<P, Y, R>
export function f<
  Y extends Yield,
  R extends Result,
  A extends ArgTypes,
>(
  argTypesOrF: A | Call<Y, R, [args: Args<A>]>,
  call?: Call<Y, R, [Args<A>]>,
): F<A, Y, R> {
  if (typeof argTypesOrF === "function") {
    return new FInternal(null!, {} as never, argTypesOrF) as never
  }
  return new FInternal(null!, argTypesOrF as never, call) as never
}
