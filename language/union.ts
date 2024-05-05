import { AnyPredicate, Match, Value } from "./Match.js"
import { Native, Type } from "./Type.js"

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

    when<Target extends Members[number], Yield, Result>(
      match: Target,
      f: (value: Value<Target>) => Generator<Yield, Result>,
    ) {
      return new Match<Value<Exclude<Members[number], Target>>, Yield, Result>(this, f, match)
    }
  }
}
