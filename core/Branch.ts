import { SignerRequirement } from "./Id/Id.js"
import { Type } from "./Type/Type.js"

export type Yield = Type | SignerRequirement
export type Result = Type | void

// TODO: values as branches
// TODO: use this
export type Branch<A extends Type[], Y extends Yield, R extends Result> =
  | Generator<Y, R>
  | ((...args: A) => Generator<Y, R>)
