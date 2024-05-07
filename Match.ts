import { Constructor, Type } from "Type.js"
import { Effect } from "./Effect.js"
import { None } from "./None.js"

export class Match<T extends Type> {
  constructor(private value: T) {}

  when<Target extends Constructor<T>, Yield, Result extends Type | void>(
    match: Target,
    f: (value: InstanceType<Target>) => Generator<Yield, Result>,
  ): Matcher<Exclude<T, InstanceType<Target>>, Yield, Result> {
    return new Matcher(this.value, f, match)
  }
}

export function rehandle<Y, R extends Type>(call: Generator<Y, R>) {
  return new Rehandle(call)
}

export class Rehandle<Y, R extends Type> {
  constructor(private call: Generator<Y, R>) {}

  when<Target extends Constructor<Y>, Yield>(
    match: Target,
    f: (value: InstanceType<Target>) => Generator<Yield, R>,
  ): Matcher<Exclude<Y, InstanceType<Target>>, Yield, R> {
    return new Matcher(this.call, f, match)
  }
}

export class Matcher<Remaining, PreviousYield, Return extends Type | void> extends Effect("Match")<
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
    CurrentYield,
  >(
    match: Target,
    f: (value: V) => Generator<CurrentYield, Return>,
  ): Matcher<Exclude<Remaining, V>, PreviousYield | CurrentYield, Return> {
    return new Matcher(this, f, match)
  }

  else<CurrentYield>(
    f: (value: Remaining) => Generator<CurrentYield, Return>,
  ): Matcher<never, PreviousYield | CurrentYield, Return> {
    return new Matcher(this, f)
  }
}
