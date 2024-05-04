import { Option } from "./Option.js"
import { AnyPredicate, NativeType, Predicate, Type, Value } from "./Type.js"

export function Union<M extends AnyPredicate[]>(...memberTypes: M) {
  return class extends Type<
    "Union",
    NativeType<Value<M[number]>>,
    { memberTypes: M },
    Value<M[number]>,
    never
  > {
    constructor() {
      super("Union", { memberTypes })
    }

    declare when: <Target extends M[number], Yield, Result>(
      match: Target,
      f: (value: Value<Target>) => Generator<Yield, Result>,
    ) => Matcher<Value<Exclude<M[number], Target>>, Yield, Result>
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
