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

export interface Instance<K extends keyof any = any, M = any, T = any> {
  type: Type<K, M>
  native: T
}

// TODO: some kind of toString/serialize method for Metadata generation
export function Type<K extends keyof any, M>(tag: K, metadata: M): Type<K, M> {
  return class Value<T> {
    static readonly tag = tag
    static readonly metadata = metadata

    declare readonly native: T
    readonly type = Value

    constructor(readonly value: T, readonly parent?: Value<T>) {}

    clone() {
      return new Value<T>(this.value, this)
    }
  }
}

export type Native<O extends Any> = O extends new(value: infer T_) => any ? T_ : never

export type Ref<T extends Any> = InstanceType<T> | Native<T>
