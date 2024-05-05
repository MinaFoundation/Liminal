import { Source, Type } from "./Type.js"

export type BoolSource = Source<"true" | "false" | "not", {}>

export class bool extends Type<"bool", boolean, {}, never, never> {
  private BoolSource = Source<BoolSource>()

  static true = new this().BoolSource("true", {})
  static false = new this().BoolSource("false", {})

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
    throw 0
  }

  not(): bool {
    return this.BoolSource("not", {})
  }

  assert<E extends Type>(error: E): E {
    return this.assertEquals(bool.true, error)
  }
}

export class If<Y> implements Generator<Y, void> {
  readonly tag = "If"

  constructor(
    readonly condition: bool,
    readonly f: () => Generator<Y, void>,
  ) {}

  next(): IteratorResult<Y, void> {
    throw 0
  }

  return(): IteratorResult<Y, void> {
    throw 0
  }

  throw(): IteratorResult<Y, void> {
    throw 0
  }

  [Symbol.iterator](): Generator<Y, void, unknown> {
    throw 0
  }
}

export class IfElse<Y1, Y2, O> implements Generator<Y1 | Y2, O> {
  readonly tag = "IfElse"

  next(): IteratorResult<Y1 | Y2, O> {
    throw 0
  }

  return(): IteratorResult<Y1 | Y2, O> {
    throw 0
  }

  throw(): IteratorResult<Y1 | Y2, O> {
    throw 0
  }

  [Symbol.iterator](): Generator<Y1 | Y2, O, unknown> {
    throw 0
  }
}
