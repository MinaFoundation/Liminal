import { Effect } from "./Effect.js"
import { Option } from "./Option.js"

export class Match<Remaining, PreviousYield, Return>
  extends Effect<"Match", PreviousYield, [Remaining] extends [never] ? Return : Option<Return>>
{
  constructor(
    self: unknown,
    readonly f: (value: any) => Generator<unknown, Return>,
    readonly match?: AnyPredicate,
  ) {
    super("Match", self)
  }

  when<
    Target extends Predicate<Remaining>,
    V extends Value<Target>,
    CurrentYield,
  >(
    match: Target,
    f: (value: V) => Generator<CurrentYield, Return>,
  ) {
    return new Match<Exclude<Remaining, V>, PreviousYield | CurrentYield, Return>(this, f, match)
  }

  else<CurrentYield>(f: (value: Remaining) => Generator<CurrentYield, Return>) {
    return new Match<never, PreviousYield | CurrentYield, Return>(this, f)
  }
}

export type Predicate<T> = T extends string ? T : new() => T
export type AnyPredicate = string | (new() => any)
export type Value<T> = T extends string ? T : T extends new() => infer I ? I : never
