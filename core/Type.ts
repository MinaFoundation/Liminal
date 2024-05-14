import { Rest } from "../util/Rest.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { bool, BoolSource } from "./Bool.ts"
import { Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"
import { State } from "./State.ts"

export type Factory<T extends Type = any> = new(source: any) => T

export class Type<
  Name extends string = any,
  Source = any,
  Native = any,
  From = any,
  Into extends Type = any,
> {
  static make<Name extends string>(name: Name) {
    return class<Source, Native, From = Native, Into extends Type = never>
      extends this<Name, Source, Native, From, Into>
    {
      constructor(source: Source | TypeSource) {
        super(name, source)
      }
    }
  }

  static new<T extends Type>(this: Factory<T>, ...[value]: Rest<Type.From<T>>): T {
    return new this(new TypeSource.New(value))
  }

  static state<T extends Type>(this: Factory<T>): State<T> {
    unimplemented()
  }

  "": {
    name: Name
    source: Source | TypeSource
    native?: [Native]
    from?: [From]
    into?: [Into]
  }

  protected ctor = this.constructor as any

  constructor(name: Name, source: Source | TypeSource) {
    this[""] = { name, source }
  }

  into<O extends Into>(into: Factory<O>): O {
    return new into(new TypeSource.Into({ from: this }))
  }

  equals<T extends Type>(this: T, inQuestion: T): bool {
    return new bool(
      new BoolSource.Equals({
        left: this,
        right: inQuestion,
      }),
    )
  }

  match<
    T extends Type,
    M extends Factory<T>,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: R | ((matched: InstanceType<M>) => R),
  ): U
  match<
    T extends Type,
    M extends Factory<T>,
    Y extends Yield,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: (matched: InstanceType<M>) => R | Generator<Y, R>,
  ): Effect<Y, U>
  match(_match: any, _f: any): any {
    unimplemented()
  }

  unhandle<T extends Type, M extends Factory<T>>(
    this: T,
    match: M,
  ): Effect<InstanceType<M>, Exclude<T, InstanceType<M>>>
  unhandle<T extends Type, M extends (Factory<T>)[]>(
    this: T,
    ...match: M
  ): Effect<InstanceType<M[number]>, Exclude<T, InstanceType<M[number]>>>
  unhandle<T extends Type, M extends Factory<T>, W extends Type>(
    this: T,
    match: M,
    with_: W,
  ): Effect<W, Exclude<T, InstanceType<M>>>
  unhandle(
    this: Type,
    _match: Factory,
    _maybeWith_?: Type | Factory,
    ..._rest: Factory[]
  ): Effect<Type, Type> {
    unimplemented()
  }
}

export declare namespace Type {
  export type From<T> = T extends Type<any, any, any, infer From> ? From : never
  export type Native<T extends Type | void> = T extends Type<any, any, infer N> ? N : undefined
}

export type TypeSource = TypeSource.New | TypeSource.Into | TypeSource.StructField
export namespace TypeSource {
  export class New extends Tagged("New")<{ from: unknown }> {}
  export class Into extends Tagged("Into")<{ from: unknown }> {}
  export class StructField extends Tagged("StructField")<{ struct: Type; key: keyof any }> {}
}
