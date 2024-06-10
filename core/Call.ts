import * as G from "../util/generator/collect.ts"
import { Type } from "./Type.ts"

export type Yield = Type
export type Result = Type | void

export type ValueCall<R, A extends unknown[]> = R | ((...args: A) => R)

export type GenCall<
  Y extends Yield = any,
  R extends Result = any,
  A extends unknown[] = any,
> = Generator<Y, R> | ((...args: A) => Generator<Y, R>)

export type Call<
  Y extends Yield = any,
  R extends Result = any,
  A extends unknown[] = any,
> = ValueCall<R, A> | GenCall<Y, R, A>

export namespace Call {
  export function collect<Y extends Yield, R extends Result>(
    call: Call<Y, R>,
  ): G.Collected<Y, R> {
    if (typeof call === "function") {
      const maybeGen = call(null!) // TODO
      if (typeof maybeGen === "object" && Symbol.iterator in maybeGen) {
        return G.collect(maybeGen)
      } else {
        return [[], maybeGen]
      }
    } else if (typeof call === "object" && Symbol.iterator in call) {
      return G.collect(call)
    } else {
      return [[], call]
    }
  }
}
