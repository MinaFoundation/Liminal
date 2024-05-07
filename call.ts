import { Effect, Result, Yield } from "./Effect.js"

export function call<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): Effect<Y, R> {
  throw 0
}
