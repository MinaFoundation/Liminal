import { Effect, Result, Yield } from "./Effect.js"

export class Type<
  Name extends string = any,
  Native = any,
  Metadata = any,
  From = any,
  Into extends Type = any,
> {
  static new<Name extends string, Metadata = undefined>(
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
    source?: unknown
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
  }

  into<O extends Into>(into: new() => O): O {
    return new Into(this, into).instance()
  }

  assertEquals<T extends Type, E extends Type>(this: T, expected: T, error: E): E {
    return new AssertEquals(this, expected, error).instance()
  }

  clone<This>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  when<
    T extends Type,
    M extends Constructor<T>,
    Y extends Yield,
    R extends Result,
    U extends Exclude<T, InstanceType<M>> | R,
  >(
    this: T,
    match: M,
    f: (value: InstanceType<M>) => Generator<Y, R>,
  ): [Y] extends [never] ? U : Effect<Y, U> {
    throw 0
  }

  unhandle<T extends Type, M extends Constructor<T>>(
    this: T,
    match: M,
  ): Effect<InstanceType<M>, Exclude<T, InstanceType<M>>> {
    throw 0
  }
}

export namespace Type {
  // TODO: why the presence of `undefined` when the `From` of `T` is `never`?
  export type From<T> = T extends Type<any, any, any, infer From> ? Exclude<From, undefined> : never
  export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
}
export type Constructor<T = any> = new(...args: any) => T

export class From<T extends Type> {
  readonly tag = "From"
  constructor(
    readonly type: Constructor<T>,
    readonly value: Type.Native<T> | Type.From<T>,
  ) {}

  instance(): T {
    const value = new this.type()
    value[""].source = this
    return value
  }
}

export class Into<O extends Type> {
  readonly tag = "Into"
  constructor(
    readonly self: O,
    readonly value: Type,
  ) {}

  instance(): O {
    const value = this.self.clone()
    value[""].source = this
    return value
  }
}

export class AssertEquals<T extends Type, E extends Type> {
  readonly tag = "AssertEquals"
  constructor(
    readonly self: T,
    readonly expected: T,
    readonly error: E,
  ) {}

  instance() {
    const value = this.error.clone()
    value[""].source = this
    return value
  }
}
