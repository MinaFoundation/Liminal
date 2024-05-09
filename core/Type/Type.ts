import { bool } from "../Bool/Bool.js"
import { Result, Yield } from "../Branch.js"
import { Effect } from "../Effect/Effect.js"
import { EqualsNode, From, Into } from "./TypeNode.js"

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

  static from<T extends Type>(
    this: new() => T,
    value: Type.Native<T> | Type.From<T>,
  ): T {
    return new From(this, value).instance()
  }

  "": {
    name: Name
    native?: Native
    metadata: Metadata
    from?: From
    into?: Into
    node?: unknown
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
  }

  into<O extends Into>(into: new() => O): O {
    return new Into(into, this).instance()
  }

  equals<T extends Type>(this: T, inQuestion: T): bool {
    return new EqualsNode(this, inQuestion).instance()
  }

  clone<This>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  match<
    T extends Type,
    M extends Constructor<T>,
    Y extends Yield,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: (matched: InstanceType<M>) => Generator<Y, R>,
  ): [Y] extends [never] ? U : Effect<Y, U> {
    throw 0
  }

  unhandle<T extends Type, M extends Constructor<T>>(
    this: T,
    match: M,
  ): Effect<InstanceType<M>, Exclude<T, InstanceType<M>>>
  unhandle<T extends Type, M extends Constructor<T>, W extends Type>(
    this: T,
    match: M,
    with_: W,
  ): Effect<W, Exclude<T, InstanceType<M>>>
  unhandle(
    this: Type,
    match: Constructor<Type>,
    with_?: Type,
  ): Effect<Type, Type> {
    throw 0
  }
}

export namespace Type {
  // TODO: why the presence of `undefined` when the `From` of `T` is `never`?
  export type From<T> = T extends Type<any, any, any, infer From> ? Exclude<From, undefined> : never
  export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
}
export type Constructor<T = any> = new(...args: any) => T
