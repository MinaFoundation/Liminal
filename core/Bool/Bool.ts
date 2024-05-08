import { Effect, Result, Yield } from "../Effect/Effect.js"
import { Type } from "../Type/Type.js"
import { False, Not, True } from "./BoolNode.js"

export class bool extends Type.make("bool")<boolean, never, never> {
  static true = new True().instance()
  static false = new False().instance()

  if<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): If<Y, R> {
    return new If(this, f)
  }

  not(): bool {
    return new Not(this).instance()
  }

  assert<E extends Type>(error: E): E {
    return this.assertEquals(bool.true, error)
  }
}

export class If<Y extends Yield, R extends Result> extends Effect<Y, R | undefined> {
  constructor(
    readonly self: bool,
    readonly f: () => Generator<Y, R>,
  ) {
    super()
  }

  else<Y2 extends Yield>(f: () => Generator<Y2, R>): Effect<Y | Y2, R> {
    throw 0
  }
}
