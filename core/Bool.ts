import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Call, Result, Statements } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { EffectStatements } from "./F.ts"
import { None } from "./None.ts"
import { PureStatements } from "./Pure.ts"
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
    constructor(readonly left: Value, readonly right: unknown) {
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

  if<R extends Result>(statements: PureStatements<{}, [], R>): If<never, R>
  if<Y extends Value, R extends Result>(statements: EffectStatements<{}, [], Y, R>): If<Y, R>
  if<Y extends Value, R extends Result>(call: Statements<{}, [], Y, R>) {
    return new If(this, call)
  }

  not(): bool {
    return new bool(new BoolSource.Not(this))
  }

  assert<E extends Value>(_error: E): Effect<E, never> {
    unimplemented()
  }
}

export class If<Y extends Value, R extends Result> extends Effect<Y, R | None> {
  constructor(readonly self: bool, readonly call: Statements<{}, [], Y, R>) {
    super()
    const [yields, result] = Call.collect(call)
    this.yields = yields
    this.result = result
  }

  else<R2 extends Result>(
    statements: PureStatements<{}, [], R2>,
  ): [Y] extends [never] ? R | R2 : Effect<Y, R | R2>
  else<Y2 extends Value, R2 extends Result>(
    statements: EffectStatements<{}, [], Y2, R2>,
  ): Effect<Y | Y2, R | R2>
  else<Y2 extends Value, R2 extends Result>(_statements: Statements<{}, [], Y2, R2>) {
    return unimplemented()
  }
}
