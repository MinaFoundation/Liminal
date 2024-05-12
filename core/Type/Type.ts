import { Rest } from "../../util/Rest.js"
import { bool } from "../Bool/Bool.js"
import { Result, Yield } from "../Branch.js"
import { Effect } from "../Effect/Effect.js"
import { State } from "../State/State.js"
import { EqualsNode, FromNode, IntoNode, StateNode } from "./TypeNode.js"

export class Type<
  Name extends string = any,
  Native = any,
  Metadata = any,
  From = any,
  Into extends Type = any,
> {
  static make<Name extends string, Metadata = undefined>(
    name: Name,
    metadata: Metadata = undefined!,
  ) {
    return class<Native, From = never, Into extends Type = never>
      extends this<Name, Native, Metadata, From, Into>
    {
      constructor() {
        super(name, metadata)
      }
    }
  }

  static new<T extends Type>(this: new() => T, ...[value]: Rest<Type.From<T>>): T {
    return new FromNode(this, value).instance()
  }

  static state<T extends Type>(this: new() => T): State<T> {
    throw 0
  }

  "": {
    name: Name
    metadata: Metadata
    node: unknown
    native?: [Native]
    from?: [From]
    into?: [Into]
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = {
      name,
      metadata,
      node: null!,
    }
  }

  into<O extends Into>(into: new() => O): O {
    return new IntoNode(into, this).instance()
  }

  equals<T extends Type>(this: T, inQuestion: T): bool {
    return new EqualsNode(this, inQuestion).instance()
  }

  clone<This>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  match<
    T extends Type,
    M extends new() => T,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: R | ((matched: InstanceType<M>) => R),
  ): U
  match<
    T extends Type,
    M extends new() => T,
    Y extends Yield,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: (matched: InstanceType<M>) => R | Generator<Y, R>,
  ): Effect<Y, U>
  match(match: any, f: any): any {
    throw 0
  }

  unhandle<T extends Type, M extends new() => T>(
    this: T,
    match: M,
  ): Effect<InstanceType<M>, Exclude<T, InstanceType<M>>>
  unhandle<T extends Type, M extends (new() => T)[]>(
    this: T,
    ...match: M
  ): Effect<InstanceType<M[number]>, Exclude<T, InstanceType<M[number]>>>
  unhandle<T extends Type, M extends new() => T, W extends Type>(
    this: T,
    match: M,
    with_: W,
  ): Effect<W, Exclude<T, InstanceType<M>>>
  unhandle(
    this: Type,
    match: new() => Type,
    maybeWith_?: Type | (new() => Type),
    ...rest: (new() => Type)[]
  ): Effect<Type, Type> {
    throw 0
  }
}

export declare namespace Type {
  export type From<T> = T extends Type<any, any, any, infer From> ? From : never
  export type Native<T extends Type | void> = T extends Type<any, infer Name> ? Name : undefined
}
