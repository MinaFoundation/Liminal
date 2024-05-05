import { Effect } from "./Effect.js"
import { Source } from "./Source.js"
import { Type } from "./Type.js"

export type BoolSource = Source<"true" | "false" | "not", {}>

export class bool extends Type<"bool", boolean, {}, never, never> {
  #BoolSource = Source<BoolSource>()

  static true = new this().#BoolSource("true", {})
  static false = new this().#BoolSource("false", {})

  constructor() {
    super("bool", {})
  }

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
    return this.#BoolSource("not", {})
  }

  assert<E extends Type>(error: E): E {
    return this.assertEquals(bool.true, error)
  }
}

export class If<Y> extends Effect<"If", Y, void> {
  constructor(
    self: bool,
    readonly f: () => Generator<Y, void>,
  ) {
    super("If", self)
  }
}

export class IfElse<Y1, Y2, O> extends Effect<"If", Y1 | Y2, O> {
  constructor(
    self: bool,
    readonly if_: () => Generator<Y1, O>,
    readonly else_: () => Generator<Y2, O>,
  ) {
    super("If", self)
  }
}
