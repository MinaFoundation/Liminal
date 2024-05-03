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

  declare into: <O extends Into, A extends unknown[]>(
    type: new(...args: A) => O,
    ...args: A
  ) => O

  declare assertEquals: <This, E>(this: This, expected: This, error: E) => E
}
export namespace Type {
  export type Native<T extends Type> = T extends Type<any, infer N> ? N : never
}
