import { Globals } from "./Contract.js"

export interface f<
  A extends any[] = any,
  Y = any,
  O = any,
> extends ReturnType<typeof f<A, Y, O>> {}

export declare function f<A extends any[], Y, O>(
  f: (this: Globals, ...args: A) => Generator<Y, O>,
): (...args: A) => Call<Y, O>

export interface Call<Y, O> extends Generator<Y, O> {
  match(): Generator<any, any>
  ifLet(): Generator<any, any>
}
