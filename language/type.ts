export class Type<
  Name extends string = any,
  Native = any,
  Metadata = any,
  From = any,
  Into extends Type = any,
> {
  static from<T extends Type, A extends unknown[]>(
    this: new(...args: A) => T,
    value: FromType<T>,
    ...args: A
  ): T {
    return new this(...args) // TODO: get value in there
  }

  static lift<T extends Type, Args extends unknown[]>(
    this: new(...args: Args) => T,
    value: NativeType<T>,
    ...args: Args
  ): T {
    return new this(...args) // TODO: get value in there
  }

  "": {
    name: Name
    native?: Native
    metadata: Metadata
    from?: From
    into?: Into
  }

  constructor(name: Name, metadata: Metadata) {
    this[""] = { name, metadata }
  }

  into<O extends Into, A extends unknown[]>(
    type: new(...args: A) => O,
    ...args: A
  ): O {
    throw 0
  }

  assertEquals<This, E>(this: This, expected: This, error: E): E {
    throw 0
  }
}

export type NativeType<T> = T extends string ? T : T extends Type<any, infer Name> ? Name : never
export type FromType<T> = T extends Type<any, any, any, infer From> ? From : never

export type Instance<T> = T extends string ? T : T extends Constructor<infer U> ? U : never

export interface TypeConstructor extends Constructor<Type> {}
export interface Constructor<T> {
  new(...args: any): T
}
export type Predicate<T> = T extends string ? T : Constructor<T>
export type AnyPredicate = string | Constructor<any>

export type Value<T> = T extends string ? T : T extends Constructor<infer I> ? I : never
