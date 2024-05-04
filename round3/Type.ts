export class Type<K extends string = any, N = any, M = any, From = any, Into extends Type = any> {
  static from<T extends Type, A extends unknown[]>(
    this: new(...args: A) => T,
    value: T extends Type<any, any, any, infer F, any> ? F : never,
    ...args: A
  ): T {
    return new this(...args) // TODO: get value in there
  }

  static lift<T extends Type, A extends unknown[]>(
    this: new(...args: A) => T,
    value: T extends Type<any, infer N, any, any, any> ? N : never,
    ...args: A
  ): T {
    return new this(...args) // TODO: get value in there
  }

  "": {
    name: K
    native?: N
    metadata: M
    from?: From
    into?: Into
  }

  constructor(name: K, metadata: M) {
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

export type Native<T> = T extends string ? T : T extends Type<any, infer N> ? N : never

export type Instance<T> = T extends string ? T
  : T extends (new(...args: any) => infer U extends Type) ? U
  : never

export type Predicate<T> = T extends string ? T : new(...args: any) => T
export type AnyPredicate = string | (new(...args: any) => any)

export type Value<T> = T extends string ? T
  : T extends new(...args: any) => infer I ? I
  : never
