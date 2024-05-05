import { Effect } from "./Effect.js"
import { id } from "./id.js"
import { Match, Predicate, Value } from "./Match.js"
import { TxContext } from "./tx.js"

export interface F<A extends unknown[] = any, Y = any, O = any> {
  (...args: A): Call<A, Y, O>
}

export function f<A extends unknown[], Y, O>(
  f: (this: FContext, ...args: A) => Generator<Y, O>,
): F<A, Y, O> {
  return (...args) => new Call(f, args)
}

export interface FContext extends TxContext {
  contract: id
}

export class Call<A extends unknown[], Y, O> extends Effect<"Call", Y, O> {
  constructor(
    self: (this: FContext, ...args: A) => Generator<Y, O>,
    readonly args: A,
  ) {
    super("Call", self)
  }

  when<M extends Predicate<Y>>(
    match: M,
    f: (value: Value<M>) => Generator<Y, O>,
  ): Match<Exclude<Y, Value<M>>, Y, O> {
    return new Match(this, f, match)
  }
}
