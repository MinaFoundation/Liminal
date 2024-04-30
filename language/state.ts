import { Any, Native, Type } from "./type.js"

export type item<T extends Any = Any> = ReturnType<typeof item<T>>
export function item<T extends Any>(t: T) {
  return class extends Type("item", { type: t })<Native<T>> {
    static fetch(): Promise<Native<T>> {
      throw 0
    }

    static fetchHash(): Promise<Uint8Array> {
      throw 0
    }
  }
}

export type map<K extends Any, V extends Any> = ReturnType<typeof map<K, V>>
export function map<K extends Any, V extends Any>(key: K, value: V) {
  return class extends Type("map", { key, value })<MerkleMap<Native<K>, Native<V>>> {
    static get(key: InstanceType<K>): InstanceType<V> {
      throw 0
    }

    static set(key: InstanceType<K>, value: InstanceType<V>): InstanceType<V> {
      throw 0
    }
  }
}

export class MerkleMap<K, V> {}
