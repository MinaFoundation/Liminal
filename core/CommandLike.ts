import { collect, Collected } from "../util/generator/collect.ts"
import { Type } from "./Type.ts"

export type Yield = Type
export type Result = Type | void

export type CommandLike<Y extends Yield = any, R extends Result = any> =
  | R
  | (() => R)
  | Generator<Y, R>
  | (() => Generator<Y, R>)

export namespace CommandLike {
  export function normalize<Y extends Yield, R extends Result>(
    command: CommandLike<Y, R>,
  ): Collected<Y, R> {
    if (typeof command === "function") {
      const maybeGen = command()
      if (typeof maybeGen === "object" && Symbol.iterator in maybeGen) {
        return collect(maybeGen)
      } else {
        return [[], maybeGen]
      }
    } else if (typeof command === "object" && Symbol.iterator in command) {
      return collect(command)
    } else {
      return [[], command]
    }
  }
}
