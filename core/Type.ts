import { Rest } from "../util/Rest.ts"
import { Setter } from "../util/Setter.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { bool, BoolSource } from "./Bool.ts"
import { GenCall, Result, ValueCall, Yield } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { Union, UnionCtor } from "./Union.ts"

export type Factory<T extends Type = any> = new(source: any) => T

export class Type<
  Name extends string = any,
  Source = any,
  Native = any,
  From = any,
  Into extends Type = any,
> {
  static make<Name extends string>(name: Name) {
    return class<Source, Native = never, From = Native, Into extends Type = never>
      extends this<Name, Source, Native, From, Into>
    {
      constructor(source: Source | TypeSource) {
        super(name, source)
      }
    }
  }

  static or<F extends Factory, O extends Factory>(
    this: F,
    or: O,
  ): F extends UnionCtor<infer M> ? UnionCtor<M | O> : UnionCtor<F | O> {
    return Union(this, or) as never
  }

  static new<T extends Type>(this: Factory<T>, ...[value]: Rest<Type.From<T>>): T {
    return new this(new TypeSource.New(value))
  }

  static withDefault<F extends Factory>(this: F, _from: Type.From<InstanceType<F>>): F {
    unimplemented()
  }

  static default<F extends Factory>(this: F): InstanceType<F> {
    unimplemented()
  }

  declare ""?: [Native, From, Into]
  ctor = this.constructor as never as new(source: Source | TypeSource) => this

  constructor(readonly typeName: Name, readonly source: Source | TypeSource) {}

  apply<T extends Type>(this: T, metadata: unknown): T {
    return new this.ctor(new TypeSource.Apply(this, metadata))
  }

  assign<T extends Type>(_setter: Setter<T>): Effect<never, T> {
    unimplemented()
  }

  into<O extends Into>(into: Factory<O>): O {
    return new into(new TypeSource.Into(this))
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
  export type Args<A extends Type[]> = { [K in keyof A]: A[K] | From<A[K]> | Native<A[K]> }
}

export type TypeSource =
  | TypeSource.New
  | TypeSource.Into
  | TypeSource.StructField
  | TypeSource.Apply
  | TypeSource.Default
export namespace TypeSource {
  export class New extends Tagged("New") {
    constructor(readonly from: unknown) {
      super()
    }
  }
  export class Into extends Tagged("Into") {
    constructor(readonly into: unknown) {
      super()
    }
  }
  export class StructField extends Tagged("StructField") {
    constructor(readonly self: Type, readonly key: keyof any) {
      super()
    }
  }
  export class Apply extends Tagged("Apply") {
    constructor(readonly self: Type, readonly metadata: unknown) {
      super()
    }
  }
  export class Default<F extends Factory = any> extends Tagged("Default") {
    constructor(readonly factory: F, readonly from: Type.From<F>) {
      super()
    }
  }
}
