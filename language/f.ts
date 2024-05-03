import { ContractContext } from "./Contract.js"
import { VariantValue } from "./union.js"

export interface f<
  A extends any[] = any,
  Y = any,
  O = any,
> extends ReturnType<typeof f<A, Y, O>> {}

export declare function f<
  A extends any[],
  Y extends VariantValue,
  O,
>(
  f: (this: ContractContext, ...args: A) => Generator<Y, O>,
): (...args: A) => Effect<Y, O>

export class Effect<G extends VariantValue, O> implements Generator<G, O> {
  readonly tag = "Call"

  declare when: <M extends G, Y>(
    match: M,
    f: (value: M) => Generator<Y, void>,
  ) => Generator<Y, void>

  // declare match: () => Matcher<G>

  next(): IteratorResult<G, O> {
    throw 0
  }

  return(): IteratorResult<G, O> {
    throw 0
  }

  throw(): IteratorResult<G, O> {
    throw 0
  }

  [Symbol.iterator](): Generator<G, O, unknown> {
    throw 0
  }
}
