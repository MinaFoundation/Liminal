import { Constructor } from "./Type.js"

export class Effect<Y, R = never> implements Generator<Y, R> {
  next(): IteratorResult<Y, R> {
    throw 0
  }

  return(): IteratorResult<Y, R> {
    throw 0
  }

  throw(): IteratorResult<Y, R> {
    throw 0
  }

  [Symbol.iterator](): Generator<Y, R> {
    throw 0
  }

  handle<Match extends Constructor<Y> | undefined>(
    f: (value: Match extends Constructor ? InstanceType<Match> : Y) => R,
    match: Match = undefined!,
  ): R {
    throw 0
  }

  rehandle<Match extends Constructor<Y>>(
    match: Match,
  ): [Exclude<Y, InstanceType<Match>>] extends [never] ? InstanceType<Match> | R
    : Effect<Exclude<Y, InstanceType<Match>>, R>
  {
    throw 0
  }
}
