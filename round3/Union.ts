import { Option } from "./std/Option.js"
import { AnyPredicate, Native, Predicate, Type, Value } from "./Type.js"

export function Union<M extends AnyPredicate[]>(...memberTypes: M) {
  return class extends Type<
    "Union",
    Native<Value<M[number]>>,
    { memberTypes: M },
    Value<M[number]>,
    never
  > {
    constructor() {
      super("Union", { memberTypes })
    }

    // declare when: <P extends M[number], Y, O>(
    //   match: P,
    //   f: (value: Value<P>) => Generator<Y, O>,
    // ) => Matcher<Exclude<Value<M[number]>, Value<P>>, Y, O>
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
