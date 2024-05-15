import { Inspect, Inspectable } from "../util/inspect.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Result, Yield } from "./CommandLike.ts"
import { Factory } from "./Type.ts"

export abstract class Effect<Y extends Yield, R extends Result> extends Inspectable
  implements Generator<Y, R>
{
  abstract yields: Y[]
  abstract result: R

  pipe<R2 extends Result>(_f: (value: R) => R2): Effect<Y, R2> {
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

  *[Symbol.iterator](): Generator<Y, R> {
    yield this as never
    return this.result
  }

  handle<M extends Factory<Y>, R extends Result>(
    match: M,
    f: R | ((matched: InstanceType<M>) => R),
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? R : Effect<Exclude<Y, InstanceType<M>>, R>
  handle<M extends Factory<Y>, Y2 extends Yield, R extends Result>(
    match: M,
    f: Generator<Y2, R> | ((value: InstanceType<M>) => Generator<Y2, R>),
  ): [Exclude<Y, InstanceType<M>> | Y2] extends [never] ? R
    : Effect<Exclude<Y, InstanceType<M>> | Y2, R>
  handle(_match: any, _f: any): any {
    unimplemented()
  }

  rehandle<M extends Factory[]>(
    ...match: M
  ): [Exclude<Y, InstanceType<M[number]>>] extends [never] ? InstanceType<M[number]> | R
    : Effect<Exclude<Y, InstanceType<M[number]>>, R>
  rehandle(..._match: any): any {
    unimplemented()
  }

  protected override inspect(inspect: Inspect): string {
    return `GetState(${inspect(this.result)})`
  }
}
