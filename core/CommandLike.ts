import { SignerRequirement } from "./Id.ts"
import { Type } from "./Type.ts"

export type Yield = Type | SignerRequirement
export type Result = Type | void

export type CommandLike<Y extends Yield = any, R extends Result = any> =
  | R
  | (() => R)
  | Generator<Y, R>
  | (() => Generator<Y, R>)
