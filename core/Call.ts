import { unimplemented } from "../util/unimplemented.ts"
import { CommandLike, Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"

// TODO: non-gen-related overloads are likely useless... but do we keep them for consistency?
export function call<R extends Result>(f: R): Effect<never, R>
export function call<Y extends Yield, R extends Result>(g: Generator<Y, R>): Effect<Y, R>
export function call<R extends Result>(f: () => R): Effect<never, R>
export function call<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): Effect<Y, R>
export function call<Y extends Yield, R extends Result>(
  _value: CommandLike<Y, R>,
): Effect<Yield, Result> {
  unimplemented()
}
