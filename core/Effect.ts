import { unimplemented } from "../util/unimplemented.ts"
import { Call, GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Factory, Type } from "./Type.ts"

export abstract class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  declare yields?: Y[]
  declare result?: R

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

  "?"<M extends Factory<Exclude<R, void>>>(
    match: M,
  ): Effect<Y | InstanceType<M>, Exclude<R, InstanceType<M>>>
  "?"<M extends Factory<Exclude<R, void>>, W extends Type>(
    match: M,
    with_: W,
  ): Effect<Y | W, Exclude<R, InstanceType<M>>>
  "?"(
    _match: Factory<Exclude<R, void>>,
    _maybeWith_?: Type,
  ) {
    return unimplemented()
  }

  catch<
    M extends Factory<Y>,
    R2 extends Result,
  >(
    match: M,
    f: ValueCall<R2, [InstanceType<M>]>,
  ): Effect<Exclude<Y, InstanceType<M>>, R | R2>
  catch<
    M extends Factory<Y>,
    Y2 extends Yield,
    R2 extends Result,
  >(
    match: M,
    f: GenCall<Y, R2, [InstanceType<M>]>,
  ): Effect<Exclude<Y, InstanceType<M>> | Y2, R | R2>
  catch<
    M extends Factory<Y>,
    Y2 extends Yield,
    R2 extends Result,
  >(
    _match: M,
    _f: Call<Y, R2, [InstanceType<M>]>,
  ): Effect<Exclude<Y, InstanceType<M>> | Y2, R | R2> {
    unimplemented()
  }
}
