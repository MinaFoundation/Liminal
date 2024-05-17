import { Flatten } from "../util/Flatten.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { GenBranch, Result, ValueBranch, Yield } from "./Branch.ts"
import { Factory } from "./Type.ts"
import { ExtractUse, Use } from "./Use.ts"

export abstract class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  declare yields?: Y[]
  declare result?: R

  map<R2 extends Result>(_f: (value: R) => R2): Effect<Y, R2> {
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
    while (this.yields?.length) {
      yield this.yields.shift()!
    }
    delete this.yields
    const result = this.result!
    delete this.result
    return result
  }

  handle<M extends Factory<Y>, R extends Result>(
    match: M,
    f: ValueBranch<R, [value: InstanceType<M>]>,
  ): [Exclude<Y, InstanceType<M>>] extends [never] ? R : Effect<Exclude<Y, InstanceType<M>>, R>
  handle<M extends Factory<Y>, Y2 extends Yield, R extends Result>(
    match: M,
    f: GenBranch<Y2, R, [value: InstanceType<M>]>,
  ): [Exclude<Y, InstanceType<M>> | Y2] extends [never] ? R
    : Effect<Exclude<Y, InstanceType<M>> | Y2, R>
  handle(_match: any, _f: any): any {
    unimplemented()
  }

  rehandle<M extends Factory[]>(
    ..._match: M
  ): [Exclude<Y, InstanceType<M[number]>>] extends [never] ? Extract<Y, InstanceType<M[number]>> | R
    : Effect<Exclude<Y, InstanceType<M[number]>>, R>
  {
    unimplemented()
  }
}

export function branch<
  Y extends Yield,
  R extends Result,
  D extends ExtractUse<Y>,
  A extends Partial<D>,
  N extends Omit<D, keyof A>,
>(
  _branch: Generator<Y, R> | (() => Generator<Y, R>),
  _uses: A,
): Effect<
  Exclude<Y, Use> | [keyof N] extends [never] ? never : Use<Flatten<N>>,
  R
> {
  unimplemented()
}
