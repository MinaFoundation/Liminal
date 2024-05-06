import { Effect } from "./Effect.js"

export function match<T>(value: T) {
  return new Match(value)
}

export class Match<T> {
  constructor(private value: T) {}

  when<Target extends Predicate<T>, Yield, Result>(
    match: Target,
    f: (value: Value<Target>) => Generator<Yield, Result>,
  ): Matcher<Exclude<T, Value<Target>>, Yield, Result> {
    return new Matcher(this.value, f, match)
  }
}

export function handle<Y, R>(call: Generator<Y, R>) {
  return new Handle(call)
}

export class Handle<Y, R> {
  constructor(private call: Generator<Y, R>) {}

  when<Target extends Predicate<Y>, Yield>(
    match: Target,
    f: (value: Value<Target>) => Generator<Yield, R>,
  ): Matcher<Exclude<Y, Value<Target>>, Yield, R> {
    return new Matcher(this.call, f, match)
  }
}

export class Matcher<Remaining, PreviousYield, Return>
  extends Effect("Match")<PreviousYield, [Remaining] extends [never] ? Return : undefined | Return>
{
  constructor(
    readonly self: unknown,
    readonly f: (value: any) => Generator<unknown, Return>,
    readonly match?: AnyPredicate,
  ) {
    super()
  }

  when<
    Target extends Predicate<Remaining>,
    V extends Value<Target>,
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

export type Predicate<T> = T extends undefined ? undefined : T extends string ? T : new() => T
export type AnyPredicate = undefined | string | (new() => any)
export type Value<T> = T extends undefined ? undefined
  : T extends string ? T
  : T extends new() => infer I ? I
  : never
