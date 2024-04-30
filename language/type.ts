// TODO: some kind of toString/serialize method for Metadata generation
// TODO: hashing?
export interface Type<K extends keyof any, M> extends ReturnType<typeof Type<K, M>> {}
export function Type<K extends keyof any, M>(tag: K, metadata: M) {
  return class Instance<T> {
    static readonly tag = tag
    static readonly metadata = metadata

    declare readonly native: T
    readonly type = Instance

    constructor(readonly value: T | Instance<T>) {}
  }
}

export type Native<O extends Any> = O extends new(value: infer T_) => any ? T_ : never

export type Value<T extends Any> = InstanceType<T> | Native<T>

export interface Any extends Type<any, any> {
  new(value: any): any
}
