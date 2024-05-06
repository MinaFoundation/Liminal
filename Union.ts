import { AnyPredicate, Match, Value } from "./Match.js"
import { Type, type } from "./Type.js"

export function Union<Members extends AnyPredicate[]>(...memberTypes: Members) {
  return class extends type("Union", { memberTypes })<
    Type.Native<Value<Members[number]>>,
    Value<Members[number]>,
    never
  > {
    when<Target extends Members[number], Yield, Result>(
      match: Target,
      f: (value: Value<Target>) => Generator<Yield, Result>,
    ): Match<Value<Exclude<Members[number], Target>>, Yield, Result> {
      return new Match(this, f, match)
    }
  }
}
