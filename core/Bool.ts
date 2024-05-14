import { Tagged } from "../util/Tagged.ts"
import { Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"
import { None } from "./None.ts"
import { Type } from "./Type.ts"

export class bool extends Type.make("bool")<BoolSource, boolean, never, never> {
  if<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): If<Y, R> {
    return new If(this, f)
  }

  not(): bool {
    return new bool(new BoolSource.Not({ not: this }))
  }

  assert<E extends Type>(error: E): Effect<E, never> {
    throw 0
    // return new AssertNode(this, error).instance()
  }
}

export class If<Y extends Yield, R extends Result> extends Effect<Y, R | None> {
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

export type BoolSource = BoolSource.True | BoolSource.False | BoolSource.Not | BoolSource.Equals
export namespace BoolSource {
  export class True extends Tagged("True") {}
  export class False extends Tagged("False") {}
  export class Not extends Tagged("Not")<{ not: bool }> {}
  export class Equals extends Tagged("Equals")<{ left: Type; right: Type }> {}
}

const true_ = new bool(new BoolSource.True())
export { true_ as true }

const false_ = new bool(new BoolSource.False())
export { false_ as false }
