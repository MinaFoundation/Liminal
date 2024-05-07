import { Constructor, Type } from "Type.js"
import { Effect, Yield } from "./Effect.js"
import { None } from "./None.js"

export class Match<T extends Type> {
  constructor(private value: T) {}

  when<Target extends Constructor<T>, Yield extends Type, Result extends Type | void>(
    match: Target,
    f: (value: InstanceType<Target>) => Generator<Yield, Result>,
  ): Matcher<Exclude<T, InstanceType<Target>>, Yield, Result> {
    return new Matcher(this.value, f, match)
  }
}

export class Matcher<
  Remaining extends Yield,
  PreviousYield extends Type,
  Return extends Type | void,
> extends Effect<
  PreviousYield,
  [Remaining] extends [never] ? void extends Return ? Exclude<Return, void> | None : Return
    : None | Exclude<Return, void>
> {
  constructor(
    readonly self: unknown,
    readonly f: (value: any) => Generator<unknown, Return>,
    readonly match?: Constructor,
  ) {
    super()
  }

  when<
    Target extends Constructor<Remaining>,
    V extends InstanceType<Target>,
    CurrentYield extends Type,
  >(
    match: Target,
    f: (value: V) => Generator<CurrentYield, Return>,
  ): Matcher<Exclude<Remaining, V>, PreviousYield | CurrentYield, Return> {
    return new Matcher(this, f, match)
  }

  else<CurrentYield extends Type>(
    f: (value: Remaining) => Generator<CurrentYield, Return>,
  ): Matcher<never, PreviousYield | CurrentYield, Return> {
    return new Matcher(this, f)
  }
}
