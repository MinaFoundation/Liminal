import * as G from "../util/generator/collect.ts"
import { Type } from "./Type.ts"

export type Yield = Type
export type Result = Type | void

export type ValueBranch<R, A extends unknown[]> = R | ((...args: A) => R)

export type GenBranch<
  Y extends Yield = any,
  R extends Result = any,
  A extends unknown[] = any,
> = Generator<Y, R> | ((...args: A) => Generator<Y, R>)

export type Branch<
  Y extends Yield = any,
  R extends Result = any,
  A extends unknown[] = any,
> = ValueBranch<R, A> | GenBranch<Y, R, A>

export namespace Branch {
  export function collect<Y extends Yield, R extends Result>(
    branch: Branch<Y, R>,
  ): G.Collected<Y, R> {
    if (typeof branch === "function") {
      const maybeGen = branch()
      if (typeof maybeGen === "object" && Symbol.iterator in maybeGen) {
        return collect(maybeGen)
      } else {
        return [[], maybeGen]
      }
    } else if (typeof branch === "object" && Symbol.iterator in branch) {
      return G.collect(branch)
    } else {
      return [[], branch]
    }
  }
}
