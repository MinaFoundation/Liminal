// TODO: some kind of toString/serialize method for Metadata generation
// TODO: hashing?
export interface Type<K extends keyof any, M> extends ReturnType<typeof Type<K, M>> {}
export function Type<K extends keyof any, M>(tag: K, metadata: M) {
  return class Instance<T> {
    static readonly "" = {
      tag: tag,
      metadata: metadata,
    }

    readonly "": {
      type: typeof Instance<T>
      value: T | Instance<T>
    }

    constructor(value: T | Instance<T>) {
      this[""] = {
        type: Instance<T>,
        value,
      }
    }
  }
}

export type Native<O extends Any> = O extends new(value: infer T_) => any ? T_ : never

export type Value<T extends Any | InstanceType<Any>> = T extends Any ? InstanceType<T> | Native<T>
  : T extends InstanceType<Any> ? Value<T[""]["type"]>
  : never

export interface Any extends Type<any, any> {
  new(value: any): any
}
