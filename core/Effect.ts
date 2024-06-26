import { unimplemented } from "../util/unimplemented.ts"
import { Result, Statements } from "./Call.ts"
import { EffectStatements } from "./F.ts"
import { PureStatements } from "./Pure.ts"
import { Type, Value } from "./Value.ts"

export abstract class Effect<Y extends Value, R extends Result> implements Generator<Y, R> {
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

  match<T extends Type<R>, R2 extends Result>(
    match: T,
    statements: PureStatements<{}, [InstanceType<T>], R2>,
  ): Effect<Y, Exclude<R, InstanceType<T>> | R2>
  match<T extends Type<R>, Y2 extends Value, R2 extends Result>(
    this: Effect<Y, R>,
    match: T,
    statements: EffectStatements<{}, [InstanceType<T>], Y2, R2>,
  ): Effect<Y | Y2, Exclude<R, InstanceType<T>> | R2>
  match<T extends Type<R>, Y2 extends Value, R2 extends Result>(
    this: Effect<Y, R>,
    _match: T,
    _statements: Statements<{}, [InstanceType<T>], Y2, R2>,
  ): Effect<Y | Y2, Exclude<R, InstanceType<T>> | R2> {
    unimplemented()
  }

  "?"<M extends Type<Exclude<R, void>>>(
    match: M,
  ): Effect<Y | InstanceType<M>, Exclude<R, InstanceType<M>>>
  "?"<M extends Type<Exclude<R, void>>, W extends Value>(
    match: M,
    with_: W,
  ): Effect<Y | W, Exclude<R, InstanceType<M>>>
  "?"(
    _match: Type<Exclude<R, void>>,
    _maybeWith_?: Value,
  ) {
    return unimplemented()
  }

  catch<
    M extends Type<Y>,
    R2 extends Result,
  >(
    match: M,
    statements: PureStatements<{}, [InstanceType<M>], R2>,
  ): Effect<Exclude<Y, InstanceType<M>>, R | R2>
  catch<
    M extends Type<Y>,
    Y2 extends Value,
    R2 extends Result,
  >(
    match: M,
    statements: EffectStatements<{}, [InstanceType<M>], Y, R2>,
  ): Effect<Exclude<Y, InstanceType<M>> | Y2, R | R2>
  catch<
    M extends Type<Y>,
    Y2 extends Value,
    R2 extends Result,
  >(
    _match: M,
    _statements: Statements<{}, [InstanceType<M>], Y, R2>,
  ): Effect<Exclude<Y, InstanceType<M>> | Y2, R | R2> {
    unimplemented()
  }

  map<R2 extends Result>(statements: PureStatements<{}, [R], R2>): Effect<Y, R2>
  map<Y2 extends Value, R2 extends Result>(
    statements: EffectStatements<{}, [R], Y, R2>,
  ): Effect<Y | Y2, R2>
  map<Y2 extends Value, R2 extends Result>(
    _statements: Statements<{}, [R], Y, R2>,
  ): Effect<Y | Y2, R2> {
    unimplemented()
  }
}
