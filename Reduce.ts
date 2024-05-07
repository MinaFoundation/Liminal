import { Effect } from "Effect.js"
import { Type } from "Type.js"

export type Reduce<T extends Type, K extends string> = <Y, R extends Type>(
  initial: R,
  f: (acc: R, cur: T) => Generator<Y, R>,
  kind: K,
) => Effect<R, T>
