export interface Type<K extends keyof any, M> {
  tag: K
  metadata: M
  new<T>(value: T): Instance<K, M, T>
}
export type Any = {
  tag: keyof any
  metadata: any
  new(value: any): Instance<any, any, any>
}

export interface Instance<K extends keyof any, M, T> {
  type: Type<K, M>
  native: T
}

export function Type<K extends keyof any, M>(tag: K, metadata: M): Type<K, M> {
  return class Instance<T> {
    static readonly tag = tag
    static readonly metadata = metadata

    readonly type = Instance
    declare readonly native: T

    constructor(readonly value: T) {}
  }
}

export type Native<O extends Any> = O extends new(value: infer T_) => any ? T_ : never
