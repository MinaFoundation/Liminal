import { Result, Yield } from "./CommandLike.ts"
import { Factory } from "./Type.ts"

export class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  "" = {} as { node: unknown }

  pipe<R2 extends Result>(f: (value: R) => R2): Effect<Y, R2> {
    throw 0
  }

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

  handle<M extends Factory<Y>, R extends Result>(
    match: M,
    f: R | ((matched: InstanceType<M>) => R),
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? R : Effect<Exclude<Y, InstanceType<M>>, R>
  handle<M extends Factory<Y>, Y2 extends Yield, R extends Result>(
    match: M,
    f: (value: InstanceType<M>) => Generator<Y2, R>,
  ): [Exclude<Y, InstanceType<M>> | Y2] extends [never] ? R
    : Effect<Exclude<Y, InstanceType<M>> | Y2, R>
  {
    throw 0
  }

  // TODO: fix this
  rehandle<M extends Factory<Y>>(
    match: M,
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? InstanceType<M> | R
    : Effect<Exclude<Y, InstanceType<M>>, R>
  {
    throw 0
  }
}
