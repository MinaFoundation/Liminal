import { Effect } from "./Effect.js"
import { Err } from "./Err.js"
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
export class AssertEquals<T extends Err> extends source("assertEquals")<T, {
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

  assertEquals<This extends Type, E extends Err>(this: This, expected: This, error: E): E {
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
  ): Effect<InstanceType<Match>, Exclude<This, InstanceType<Match>>> {
    throw 0
  }

  // TODO: enable overload
  handle<This extends Type, Match extends Constructor, Y>(
    this: This,
    match: Match,
    f: (value: InstanceType<Match>) => Generator<Y, Exclude<This, InstanceType<Match>>>,
  ): Effect<InstanceType<Match> | Y, Exclude<This, InstanceType<Match>>> {
    throw 0
  }
}

export namespace Type {
  export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
  // TODO: why the presence of `undefined` when the `From` of `T` is `never`?
  export type From<T> = T extends Type<any, any, any, infer From> ? Exclude<From, undefined> : never
}
export type Constructor<T = any> = new(...args: any) => T
