import { Effect } from "./Effect.js"
import { Type } from "./Type.js"

export function call<Y, R extends Type>(f: () => Generator<Y, R>): Effect<Y, R> {
  throw 0
}
