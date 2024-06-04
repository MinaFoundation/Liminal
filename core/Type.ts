import { Rest } from "../util/Rest.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { bool, BoolSource } from "./Bool.ts"
import { GenCall, Result, ValueCall, Yield } from "./Call.ts"
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
  declare ""?: [Native, From, Into]

  static make<Name extends string>(name: Name) {
    return class<Source, Native = never, From = Native, Into extends Type = never>
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
    return State(this)
  }

  constructor(readonly typeName: Name, readonly source: Source | TypeSource) {}

  ctor = this.constructor as never as new(source: Source | TypeSource) => this

  into<O extends Into>(into: Factory<O>): O {
    return new into(new TypeSource.Into({ from: this }))
  }

  equals<T extends Type>(this: T, inQuestion: T): bool {
    return new bool(new BoolSource.Equals(this, inQuestion))
  }

  is<T extends Type, M extends Factory<T>>(this: T, match: M): bool {
    return new bool(new BoolSource.Is(this, match))
  }

  match<
    T extends Type,
    M extends Factory<T>,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: ValueCall<R, [InstanceType<M>]>,
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
    f: GenCall<Y, R, [InstanceType<M>]>,
  ): Effect<Y, U>
  match(_match: any, _f: any): any {
    unimplemented()
  }

  "?"<T extends Type, M extends Factory<T>>(
    this: T,
    match: M,
  ): Effect<InstanceType<M>, Exclude<T, InstanceType<M>>>
  "?"<T extends Type, M extends Factory<T>, W extends Type>(
    this: T,
    match: M,
    with_: W,
  ): Effect<W, Exclude<T, InstanceType<M>>>
  "?"<T extends Type>(
    this: T,
    _match: Factory<T>,
    _maybeWith_?: Type,
  ) {
    return unimplemented()
  }
}

export declare namespace Type {
  export type From<T> = T extends Type<any, any, any, infer From> ? From : never
  export type Native<T extends Type | void> = T extends Type<any, any, infer N> ? N : undefined
  export type Source<T extends Type> = T extends Type<any, infer S> ? S : never
}

export type TypeSource = TypeSource.New | TypeSource.Into | TypeSource.StructField
export namespace TypeSource {
  export class New extends Tagged("New") {
    constructor(readonly from: unknown) {
      super()
    }
  }
  export class Into extends Tagged("Into") {
    constructor(readonly from: unknown) {
      super()
    }
  }
  export class StructField extends Tagged("StructField") {
    constructor(readonly self: Type, readonly key: keyof any) {
      super()
    }
  }
}
