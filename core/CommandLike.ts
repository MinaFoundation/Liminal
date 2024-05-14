import { Type } from "./Type.ts"

export type Yield = Type
export type Result = Type | void

export type CommandLike<Y extends Yield = any, R extends Result = any> =
  | R
  | (() => R)
  | Generator<Y, R>
  | (() => Generator<Y, R>)
