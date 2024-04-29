export interface Type<K extends keyof any, M> {
  tag: K
  metadata: M
  new<T>(value: T): Instance<K, M>
}

export interface Instance<K extends keyof any, M> {
  type: Type<K, M>
}

export function Type<K extends keyof any, M>(tag: K, metadata: M): Type<K, M> {
  return class Instance<T> {
    static readonly tag = tag
    static readonly metadata = metadata

    readonly type = Instance

    constructor(readonly value: T) {}
  }
}

export type top = typeof top
export const top = Type(null! as any, null! as any)<any>

export type bottom = typeof bottom
export const bottom = Type(null!, null!)<never>

export type Native<O extends top> = O extends new(value: infer T_) => any ? T_ : never
