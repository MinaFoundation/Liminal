import { source } from "Source.js"
import { Effect } from "./Effect.js"
import { id, signer } from "./id.js"
import { Match, Predicate, Value } from "./Match.js"

export interface F<A extends unknown[] = any, Y = any, O = any> {
  (...args: A): Call<A, Y, O>
}

export function f<A extends unknown[], Y, O>(
  f: (this: FContext, ...args: A) => Generator<Y, O>,
): F<A, Y, O> {
  return (...args) => new Call(f, args)
}

export class CallerNode extends source("callerId")<id> {}

export class Self extends source("Self")<signer<typeof Self.key>> {
  static readonly key = Symbol()
}

export class FContext {
  caller = new CallerNode(new id()).value()
  self = new Self(new (signer(Self.key))()).value()
}

export class Call<A extends unknown[], Y, O> extends Effect("Call")<Y, O> {
  constructor(
    readonly self: (this: FContext, ...args: A) => Generator<Y, O>,
    readonly args: A,
  ) {
    super()
  }

  when<M extends Predicate<Y>>(
    match: M,
    f: (value: Value<M>) => Generator<Y, O>,
  ): Match<Exclude<Y, Value<M>>, Y, O> {
    return new Match(this, f, match)
  }
}
