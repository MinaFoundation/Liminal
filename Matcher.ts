import { Constructor, Type } from "Type.js"
import { Effect, Result, Yield } from "./Effect.js"
import { None } from "./None.js"

export class Matcher<Remaining extends Yield, Y extends Yield, R extends Result> extends Effect<
  Y,
  [Remaining] extends [never] ? void extends R ? Exclude<R, void> | None : R
    : None | Exclude<R, void>
> {
  constructor(
    readonly self: unknown,
    readonly f: (value: any) => Generator<unknown, R>,
    readonly match?: Constructor,
  ) {
    super()
  }

  when<M extends Constructor<Remaining>, V extends InstanceType<M>, Y2 extends Type>(
    match: M,
    f: (value: V) => Generator<Y2, R>,
  ): Matcher<Exclude<Remaining, V>, Y | Y2, R> {
    return new Matcher(this, f, match)
  }

  else<Y2 extends Type>(f: (value: Remaining) => Generator<Y2, R>): Matcher<never, Y | Y2, R> {
    return new Matcher(this, f)
  }
}
