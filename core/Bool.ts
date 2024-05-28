import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Call, Result, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { None } from "./None.ts"
import { Type } from "./Type.ts"

export class bool extends Type.make("bool")<BoolSource, boolean, never, never> {
  if<R extends Result>(call: R | (() => R)): If<never, R>
  if<Y extends Yield, R extends Result>(
    call: Generator<Y, R> | (() => Generator<Y, R>),
  ): If<Y, R>
  if(call: any) {
    return new If(this, call)
  }

  not(): bool {
    return new bool(new BoolSource.Not(this))
  }

  assert<E extends Type>(_error: E): Effect<E, never> {
    unimplemented()
  }
}

export class If<Y extends Yield, R extends Result> extends Effect<Y, R | None> {
  constructor(readonly self: bool, readonly call: Call<Y, R>) {
    super()
    const [yields, result] = Call.collect(call)
    this.yields = yields
    this.result = result
  }

  else<R2 extends Result>(
    call: R2 | (() => R2),
  ): [Y] extends [never] ? R | R2 : Effect<Y, R | R2>
  else<Y2 extends Yield, R2 extends Result>(
    call: Generator<Y2, R2> | (() => Generator<Y2, R2>),
  ): Effect<Y | Y2, R | R2>
  else(_call: any) {
    return unimplemented()
  }
}

export type BoolSource = BoolSource.True | BoolSource.False | BoolSource.Not | BoolSource.Equals
export namespace BoolSource {
  export class True extends Tagged("True") {}
  export class False extends Tagged("False") {}
  export class Not extends Tagged("Not") {
    constructor(readonly not: bool) {
      super()
    }
  }
  export class Equals extends Tagged("Equals") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
}

const true_ = new bool(new BoolSource.True())
export { true_ as true }

const false_ = new bool(new BoolSource.False())
export { false_ as false }
