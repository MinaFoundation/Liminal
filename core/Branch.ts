import { SignerRequirement } from "./Id/Id.js"
import { Type } from "./Type/Type.js"

export type Yield = Type | SignerRequirement
export type Result = Type | void

export type CommandLike<Y extends Yield, R extends Result> =
  | R
  | (() => R)
  | Generator<Y, R>
  | (() => Generator<Y, R>)
