import * as G from "../util/generator/collect.ts"
import { EffectStatements } from "./F.ts"
import { PureStatements } from "./Pure.ts"
import { Value } from "./Value.ts"

export type Result = Value | void

export type Statements<
  T,
  A extends unknown[] = any,
  Y extends Value = any,
  R extends Result = any,
> = PureStatements<T, A, R> | EffectStatements<T, A, Y, R>

export namespace Call {
  export function collect<T, A extends unknown[], Y extends Value, R extends Result>(
    this: T,
    statements: Statements<T, A, Y, R>,
    ...args: A
  ): G.Collected<Y, R> {
    if (typeof statements === "function") {
      // @ts-ignore .
      const maybeGen = statements.apply(this, ...args)
      if (typeof maybeGen === "object" && Symbol.iterator in maybeGen) {
        // @ts-ignore .
        return G.collect(maybeGen)
      } else {
        return [[], maybeGen]
      }
    } else if (typeof statements === "object" && Symbol.iterator in statements) {
      return G.collect(statements)
    } else {
      return [[], statements]
    }
  }
}
