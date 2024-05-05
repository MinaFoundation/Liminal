import { Type } from "./Type.js"

export class bool extends Type<"bool", boolean, {}, never, never> {
  static true = new bool()
  static false = new bool()

  constructor() {
    super("bool", {})
  }

  if<Y>(f: () => Generator<Y, void>): If<Y> {
    throw 0
  }

  ifElse<Y1, Y2, O>(
    if_: () => Generator<Y1, O>,
    else_: () => Generator<Y2, O>,
  ): IfElse<Y1, Y2, O> {
    throw 0
  }

  not(): bool {
    throw 0
  }

  assert<E extends Type>(error: E): E {
    return this.assertEquals(bool.true, error)
  }
}

export interface If<Y> extends Generator<Y, void> {
  tag: "If"
}

export interface IfElse<Y1, Y2, O> extends Generator<Y1 | Y2, O> {
  tag: "IfElse"
}
