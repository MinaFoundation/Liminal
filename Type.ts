import { source } from "./Source.js"

export function type<Name extends string, Metadata = undefined>(
  name: Name,
  metadata: Metadata = undefined!,
) {
  return class<Native, From, Into extends Type> extends Type<Name, Native, Metadata, From, Into> {
    constructor() {
      super(name, metadata)
    }
  }
}

export class Of<T extends Type> extends source("native")<T, { value: unknown }> {}
export class FromSource<T extends Type> extends source("from")<T, { value: unknown }> {}
export class IntoSource<T extends Type> extends source("into")<T, { self: unknown }> {}
export class AssertEqualsSource<T extends Type>
  extends source("assertEquals")<T, { expected: Type; actual: Type }>
{}

export class Type<
  Name extends string = any,
  Native_ = any,
  Metadata = any,
  From_ = any,
  Into extends Type = any,
> {
  static from<T extends Type>(
    this: new() => T,
    value: Native<T> | From<T>,
  ): T {
    return new FromSource(new this(), { value }).value()
  }

  "": {
    name: Name
    native?: Native_
    metadata: Metadata
    from?: From_
    into?: Into
    source?: unknown
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
  }

  into<O extends Into>(into: new() => O): O {
    return new IntoSource(new into(), { self: this }).value()
  }

  assertEquals<This extends Type, E extends Type>(this: This, expected: This, error: E): E {
    return new AssertEqualsSource(error, {
      actual: this,
      expected,
    }).value()
  }

  clone<This extends Type>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
export type From<T> = T extends Type<any, any, any, infer From> ? From : never