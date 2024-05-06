import { Effect } from "./Effect.js"

export function reduce<C>() {
  return function<T, Y, R>(
    this: T,
    initial: R,
    f: (acc: R, cur: C) => Generator<Y, R>,
  ) {
    return new ReduceResult<C, T, Y, R>(this, initial, f)
  }
}

export class ReduceResult<C, T, Y, R> extends Effect("reduce")<Y, R> {
  constructor(
    readonly self: T,
    readonly initial: R,
    readonly f: (acc: R, cur: C) => Generator<Y, R>,
  ) {
    super()
  }
}
