// TODO: some kind of toString/serialize method for Metadata generation
export interface Type<K extends keyof any, M> extends ReturnType<typeof Type<K, M>> {}
export function Type<K extends keyof any, M>(tag: K, metadata: M) {
  return class Instance<T> {
    static readonly tag = tag
    static readonly metadata = metadata

    declare readonly native: T
    readonly type = Instance

    constructor(readonly value: T | Instance<T>) {}

    clone() {
      return new Instance(this)
    }
  }
}

// TODO: type as ReturnType
export interface Instance<K extends keyof any = any, M = any, T = any> {
  type: Type<K, M>
  native: T
}

export type Native<O extends Any> = O extends new(value: infer T_) => any ? T_ : never

export type Value<T extends Any> = InstanceType<T> | Native<T>

export type Any = {
  tag: keyof any
  metadata: any
  new(value: any): Instance<any, any, any>
}
