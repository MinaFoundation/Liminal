import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { None } from "./None.ts"
import { Type, Value } from "./Value.ts"

export type BoolSource =
  | BoolSource.True
  | BoolSource.False
  | BoolSource.Random
  | BoolSource.Not
  | BoolSource.Equals
  | BoolSource.Is
  | BoolSource.IntGt
  | BoolSource.IntGte
  | BoolSource.IntLt
  | BoolSource.IntLte
export namespace BoolSource {
  export class True extends Tagged("True") {}
  export class False extends Tagged("False") {}
  export class Random extends Tagged("Random") {}
  export class Not extends Tagged("Not") {
    constructor(readonly not: bool) {
      super()
    }
  }
  export class Equals extends Tagged("Equals") {
    constructor(readonly left: Value, readonly right: Value) {
      super()
    }
  }
  export class Is extends Tagged("Is") {
    constructor(readonly inQuestion: Value, readonly match: Type) {
      super()
    }
  }
  export class IntGt extends Tagged("IntGt") {
    constructor(readonly left: Value, readonly right: unknown) {
      super()
    }
  }
  export class IntGte extends Tagged("IntGte") {
    constructor(readonly left: Value, readonly right: unknown) {
      super()
    }
  }
  export class IntLt extends Tagged("IntLt") {
    constructor(readonly left: Value, readonly right: unknown) {
      super()
    }
  }
  export class IntLte extends Tagged("IntLte") {
    constructor(readonly left: Value, readonly right: unknown) {
      super()
    }
  }
}

export class bool extends Value.make("bool")<BoolSource, boolean, boolean, never> {
  static true = new this(new BoolSource.True())
  static false = new this(new BoolSource.False())
  static random() {
    return new this(new BoolSource.Random())
  }

  if<R extends Result>(call: ValueCall<R, []>): If<never, R>
  if<Y extends Yield, R extends Result>(call: GenCall<Y, R, []>): If<Y, R>
  if<Y extends Yield, R extends Result>(call: Call<Y, R, []>) {
    return new If(this, call)
  }

  not(): bool {
    return new bool(new BoolSource.Not(this))
  }

  assert<E extends Value>(_error: E): Effect<E, never> {
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
