import { AnyPredicate } from "../Type.js"
import { Union } from "../Union.js"

export function Option<T extends AnyPredicate>(some: T) {
  return class Instance extends Union(some, "None") {}
}
