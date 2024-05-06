import { Effect } from "Effect.js"
import { Type } from "Type.js"

export type Reduce<T extends Type, K extends string> = <Y, R extends Type>(
  initial: R,
  f: (acc: R, cur: T) => Generator<Y, R>,
  kind: K,
) => ReduceResult<T, K, Y, R>

export class ReduceResult<T extends Type, K extends string, Y, R extends Type>
  extends Effect("Reduce")<R, Y>
{
  constructor(
    readonly self: T,
    readonly key: K,
    readonly initial: R,
    readonly f: (acc: any, cur: any) => Generator,
  ) {
    super()
  }
}
