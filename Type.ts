import { Effect } from "./Effect.js"
import { Match } from "./Match.js"
import { source } from "./Source.js"

export function type<Name extends string, Metadata = undefined>(
  name: Name,
  metadata: Metadata = undefined!,
) {
  return class<Native, From = never, Into extends Type = never>
    extends Type<Name, Native, Metadata, From, Into>
  {
    constructor() {
      super(name, metadata)
    }
  }
}

export class Of<T extends Type> extends source("native")<T, { value: unknown }> {}
export class From<T extends Type> extends source("from")<T, unknown> {}
export class Into<T extends Type> extends source("into")<T, Type> {}
export class AssertEquals<T extends Type> extends source("assertEquals")<T, {
  expected: Type
  actual: Type
}> {}

export class Type<
  Name extends string = any,
  Native_ = any,
  Metadata = any,
  From_ = any,
  Into_ extends Type = any,
> {
  static from<T extends Type>(
    this: new() => T,
    value: Type.Native<T> | Type.From<T>,
  ): T {
    return new From(new this(), value).value()
  }

  "": {
    name: Name
    native?: Native_
    metadata: Metadata
    from?: From_
    into?: Into_
    source?: unknown
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
  }

  into<O extends Into_>(into: new() => O): O {
    return new Into(new into(), this).value()
  }

  assertEquals<This extends Type, E extends Type>(this: This, expected: This, error: E): E {
    return new AssertEquals(error, {
      actual: this,
      expected,
    }).value()
  }

  clone<This extends Type>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  match<This extends Type>(this: This): Match<This> {
    return new Match(this)
  }

  unhandle<This extends Type, Match extends Constructor<This>>(
    this: This,
    match: Match,
  ): Unhandle<This, Match> {
    return new Unhandle(this, match)
  }

  // TODO: enable overload
  handle<This extends Type, Target extends Constructor, Y>(
    this: This,
    match: Target,
    f: (value: InstanceType<Target>) => Generator<Y, Exclude<This, InstanceType<Target>>>,
  ): Handle<This, Target, Y> {
    return new Handle(this, match, f)
  }
}

export namespace Type {
  export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
  // TODO: why the presence of `undefined` when the `From` of `T` is `never`?
  export type From<T> = T extends Type<any, any, any, infer From> ? Exclude<From, undefined> : never
}
export type Constructor<T = any> = new(...args: any) => T

export class Handle<T, Target extends Constructor<T>, Y>
  extends Effect("handle")<InstanceType<Target> | Y, Exclude<T, InstanceType<Target>>>
{
  constructor(
    readonly value: T,
    readonly match: Target,
    readonly f: (value: any) => Generator<unknown, unknown>,
  ) {
    super()
  }
}

export class Unhandle<T, Target extends Constructor<T>>
  extends Effect("unhandle")<InstanceType<Target>, Exclude<T, InstanceType<Target>>>
{
  constructor(readonly value: T, match: Target) {
    super()
  }
}
