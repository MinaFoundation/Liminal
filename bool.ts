import { Effect, Result, Yield } from "./Effect.js"
import { source } from "./Source.js"
import { Type, type } from "./Type.js"

export class True extends source("true")<bool> {}
export class False extends source("false")<bool> {}
export class Not extends source("not")<bool> {}

export class bool extends type("bool")<boolean, never, never> {
  static true = new True(new this()).value()
  static false = new False(new this()).value()

  if<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): If<Y, R> {
    return new If(this, f)
  }

  not(): bool {
    return new Not(this).value()
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
