import { Effect } from "./Effect.js"
import { Option } from "./Option.js"
import { AnyPredicate, Predicate, Value } from "./Type.js"

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
