import { AnyPredicate, Predicate } from "./Match.js"
import { Union } from "./Union.js"

export interface Option<T> extends ReturnType<typeof Option<Predicate<T>>> {}
export function Option<T extends AnyPredicate>(some: T) {
  return class Instance extends Union(some, "None") {}
}
