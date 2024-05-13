import { Rest } from "../util/Rest.ts"
import { bool } from "./Bool.ts"
import { Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"
import { ConstructorNode } from "./Node.ts"
import { State } from "./State.ts"

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
    return class<Native, From = Native, Into extends Type = never>
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
    node?: unknown
    native?: [Native]
    from?: [From]
    into?: [Into]
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
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

export class FromNode<T extends Type = any> extends ConstructorNode("From")<T> {
  constructor(type: new() => T, readonly value?: Type.From<T>) {
    super(type)
  }
}

export class IntoNode<T extends Type = any> extends ConstructorNode("Into")<T> {
  constructor(type: new() => T, readonly from: Type) {
    super(type)
  }
}

export class EqualsNode<T extends Type = any> extends ConstructorNode("Equals")<bool> {
  constructor(readonly left: T, readonly right: T) {
    super(bool)
  }
}

export class StateNode<T extends Type = any> extends ConstructorNode("State")<T> {
  constructor(type: new() => T) {
    super(type)
  }
}

export class SetStateNode<T extends Type = any> {
  readonly tag = "SetState"
  constructor(readonly state: T, readonly value: T) {}

  instance(): Effect<never, T> {
    throw 0
  }
}
