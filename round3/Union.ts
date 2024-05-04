import { AnyPredicate, Native, Type, Value } from "./Type.js"

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

    declare when: <P extends M[number], Y, O>(
      match: P,
      f: (value: Value<P>) => Generator<Y, O>,
    ) => Matcher<Exclude<M[number], Value<P>>, Y, O>
  }
}

export interface Matcher<P extends AnyPredicate, Y, O> extends Generator<Y, O> {
  when<MP extends P, Y>(
    match: MP,
    f: (value: Value<MP>) => Generator<Y, O>,
  ): Matcher<Exclude<P, MP>, Y | Y, O>

  else<Y>(f: (value: P) => Generator<Y, O>): MatchResult<Y | Y, O>
}
export interface MatchResult<P, O> extends Generator<P, O> {
  tag: "MatchResult"
}
