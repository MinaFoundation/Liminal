import { Source } from "./Source.js"
import { Struct } from "./Struct.js"

export type TypeSource =
  | Source<"from", { value: TypeConstructor }>
  | Source<"lift", { value: unknown }>
  | Source<"into", {}>
  | Source<"assertEquals", { expected: Type; actual: Type }>
  | Source<"structValue", { struct: Struct; key: string }>

export class Type<
  Name extends string = any,
  Native_ = any,
  Metadata = any,
  From_ = any,
  Into extends Type = any,
> {
  #typeSource = Source<TypeSource>()

  static from<T extends Type, A extends unknown[]>(
    this: new(...args: A) => T,
    value: From<T>,
    ...args: A
  ): T {
    return new this(...args).#typeSource("from", { value })
  }

  static lift<T extends Type, Args extends unknown[]>(
    this: new(...args: Args) => T,
    value: Native<T>,
    ...args: Args
  ): T {
    return new this(...args).#typeSource("lift", { value })
  }

  static structValue<T extends Type, Args extends unknown[]>(
    this: new(...args: Args) => T,
    value: Native<T>,
    ...args: Args
  ): T {
    return new this(...args).#typeSource("lift", { value })
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

  into<O extends Into, A extends unknown[]>(
    into: new(...args: A) => O,
    ...args: A
  ): O {
    return new into(...args).#typeSource("into", {})
  }

  assertEquals<This extends Type, E extends Type>(this: This, expected: This, error: E): E {
    return error.#typeSource("assertEquals", {
      actual: this,
      expected,
    })
  }

  clone<This extends Type>(this: This): This {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

export type Native<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
export type From<T> = T extends Type<any, any, any, infer From> ? From : never

export type Instance<T> = T extends string ? T : T extends Constructor<infer U> ? U : never

// TODO: get rid of these somehow
export interface TypeConstructor extends Constructor<Type> {}
export interface Constructor<T> {
  new(...args: any): T
}
export type Predicate<T> = T extends string ? T : Constructor<T>
export type AnyPredicate = string | Constructor<any>

export type Value<T> = T extends string ? T : T extends Constructor<infer I> ? I : never
