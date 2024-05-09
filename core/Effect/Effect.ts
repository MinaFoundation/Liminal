import { Result, Yield } from "../Branch.js"
import { Constructor } from "../Type/Type.js"

export class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  "" = {} as { node: unknown }

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

  handle<M extends Constructor<Y>, Y2 extends Yield, R extends Result>(
    match: M,
    f: (value: InstanceType<M>) => Generator<Y2, R>,
  ): [Exclude<Y, InstanceType<M>> | Y2] extends [never] ? R
    : Effect<Exclude<Y, InstanceType<M>> | Y2, R>
  {
    throw 0
  }

  rehandle<M extends Constructor<Y>>(
    match: M,
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? InstanceType<M> | R
    : Effect<Exclude<Y, InstanceType<M>>, R>
  {
    throw 0
  }
}
