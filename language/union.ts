import { Option } from "./Option.js"
import { AnyPredicate, Native, Predicate, Type, Value } from "./Type.js"

export function Union<Members extends AnyPredicate[]>(...memberTypes: Members) {
  return class extends Type<
    "Union",
    Native<Value<Members[number]>>,
    { memberTypes: Members },
    Value<Members[number]>,
    never
  > {
    constructor() {
      super("Union", { memberTypes })
    }

    declare when: <Target extends Members[number], Yield, Result>(
      match: Target,
      f: (value: Value<Target>) => Generator<Yield, Result>,
    ) => Matcher<Value<Exclude<Members[number], Target>>, Yield, Result>
  }
}

export interface Matcher<Remaining, PreviousYield, Return>
  extends Generator<PreviousYield, [Remaining] extends [never] ? Return : Option<Return>>
{
  tag: "MatchResult"

  when<
    Target extends Predicate<Remaining>,
    V extends Value<Target>,
    CurrentYield,
  >(
    match: Target,
    f: (value: V) => Generator<CurrentYield, Return>,
  ): Matcher<Exclude<Remaining, V>, PreviousYield | CurrentYield, Return>

  else<CurrentYield>(
    f: (value: Remaining) => Generator<CurrentYield, Return>,
  ): Matcher<never, PreviousYield | CurrentYield, Return>
}
