// TODO: some kind of toString/serialize method for Metadata generation
// TODO: hashing?
export interface Type<K extends keyof any, M> extends ReturnType<typeof Type<K, M>> {}
export function Type<K extends keyof any, M>(tag: K, metadata: M) {
  return class Instance<T> {
    static readonly "" = { tag, metadata }

    "": {
      type: typeof Instance<T>
      value: T | Instance<T>
      native: T
    }

    // TODO: NO!
    constructor(value: T | Instance<T>) {
      this[""] = {
        type: Instance<T>,
        value,
        native: null! as T,
      }
    }
  }
}

export type ValueNative<O extends InstanceType<Any>> = O[""]["native"]
export type TypeNative<O extends Any> = ValueNative<InstanceType<O>>

export type Value<T extends Any | InstanceType<Any>> = T extends Any
  ? InstanceType<T> | TypeNative<T>
  : T extends InstanceType<Any> ? Value<T[""]["type"]>
  : never

export interface Any extends Type<any, any> {
  new(value: any): any
}
