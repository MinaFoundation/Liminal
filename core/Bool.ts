import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { Never } from "./Never.ts"
import { None } from "./None.ts"
import { Factory, Type } from "./Type.ts"

export class bool extends Type.make("bool")<BoolSource, boolean, boolean, never> {
  if<R extends Result>(call: ValueCall<R, []>): If<never, R>
  if<Y extends Yield, R extends Result>(call: GenCall<Y, R, []>): If<Y, R>
  if<Y extends Yield, R extends Result>(call: Call<Y, R, []>) {
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

  else<R2 extends Result>(call: ValueCall<R2, []>): [Y] extends [never] ? R | R2 : Effect<Y, R | R2>
  else<Y2 extends Yield, R2 extends Result>(call: GenCall<Y2, R2>): Effect<Y | Y2, R | R2>
  else<Y2 extends Yield, R2 extends Result>(_call: Call<Y2, R2>) {
    return unimplemented()
  }
}

export type BoolSource =
  | BoolSource.True
  | BoolSource.False
  | BoolSource.Not
  | BoolSource.Equals
  | BoolSource.Is
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
  export class Is extends Tagged("Is") {
    constructor(readonly inQuestion: Type, readonly match: Factory) {
      super()
    }
  }
}

const true_ = new bool(new BoolSource.True())
export { true_ as true }

const false_ = new bool(new BoolSource.False())
export { false_ as false }
