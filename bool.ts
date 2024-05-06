import { Effect } from "./Effect.js"
import { source } from "./Source.js"
import { Type, type } from "./Type.js"

export class True extends source("true")<bool> {}
export class False extends source("false")<bool> {}
export class Not extends source("not")<bool> {}

export class bool extends type("bool")<boolean, never, never> {
  static true = new True(new this()).value()
  static false = new False(new this()).value()

  // TODO: chain this and return option if not else-d
  if<Y>(f: () => Generator<Y, void>): If<Y> {
    return new If(this, f)
  }

  ifElse<Y1, Y2, O>(
    if_: () => Generator<Y1, O>,
    else_: () => Generator<Y2, O>,
  ): IfElse<Y1, Y2, O> {
    return new IfElse(this, if_, else_)
  }

  not(): bool {
    return new Not(this).value()
  }

  assert<E extends Type>(error: E): E {
    return this.assertEquals(bool.true, error)
  }
}

export class If<Y> extends Effect("If")<Y, void> {
  constructor(
    readonly self: bool,
    readonly f: () => Generator<Y, void>,
  ) {
    super()
  }
}

export class IfElse<Y1, Y2, O> extends Effect("If")<Y1 | Y2, O> {
  constructor(
    readonly self: bool,
    readonly if_: () => Generator<Y1, O>,
    readonly else_: () => Generator<Y2, O>,
  ) {
    super()
  }
}
