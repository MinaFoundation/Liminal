import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { CommandLike, Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"
import { None } from "./None.ts"
import { Type } from "./Type.ts"

export class bool extends Type.make("bool")<BoolSource, boolean, never, never> {
  if<R extends Result>(command: R | (() => R)): If<never, R>
  if<Y extends Yield, R extends Result>(
    command: Generator<Y, R> | (() => Generator<Y, R>),
  ): If<Y, R>
  if(command: any) {
    return new If(this, command)
  }

  not(): bool {
    return new bool(new BoolSource.Not({ not: this }))
  }

  assert<E extends Type>(_error: E): Effect<E, never> {
    unimplemented()
  }
}

export class If<Y extends Yield, R extends Result> extends Effect<Y, R | None> {
  yields
  result

  constructor(
    readonly self: bool,
    readonly command: CommandLike<Y, R>,
  ) {
    super()
    const [yields, result] = CommandLike.normalize(command)
    this.yields = yields
    this.result = result
  }

  else<Y2 extends Yield>(_f: () => Generator<Y2, R>): Effect<Y | Y2, R> {
    unimplemented()
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
