import { unimplemented } from "../util/unimplemented.ts"
import { Result, Yield } from "./CommandLike.ts"
import { Factory } from "./Type.ts"

export class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  "" = {} as { node: unknown }

  pipe<R2 extends Result>(f: (value: R) => R2): Effect<Y, R2> {
    unimplemented()
  }

  next(): IteratorResult<Y, R> {
    unimplemented()
  }

  return(): IteratorResult<Y, R> {
    unimplemented()
  }

  throw(): IteratorResult<Y, R> {
    unimplemented()
  }

  [Symbol.iterator](): Generator<Y, R> {
    unimplemented()
  }

  // TODO: fix this
  handle<M extends Factory<Y>, R extends Result>(
    match: M,
    f: R | ((matched: InstanceType<M>) => R),
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? R : Effect<Exclude<Y, InstanceType<M>>, R>
  handle<M extends Factory<Y>, Y2 extends Yield, R extends Result>(
    match: M,
    f: (value: InstanceType<M>) => Generator<Y2, R>,
  ): [Exclude<Y, InstanceType<M>> | Y2] extends [never] ? R
    : Effect<Exclude<Y, InstanceType<M>> | Y2, R>
  handle(_match: any, _f: any): any {
    unimplemented()
  }

  // TODO: fix this
  rehandle<M extends Factory<Y>>(
    match: M,
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? InstanceType<M> | R
    : Effect<Exclude<Y, InstanceType<M>>, R>
  rehandle(_match: any): any {
    unimplemented()
  }
}
