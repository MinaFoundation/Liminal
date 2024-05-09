import { Branch, Result, Yield } from "../Branch.js"
import { Effect } from "../Effect/Effect.js"

export function call<Y extends Yield, R extends Result>(
  f: Branch<[], Y, R>,
): Effect<Y, R> {
  throw 0
}
