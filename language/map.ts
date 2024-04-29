import { Any, Native, Type } from "./type.js"

export type map<K extends Any, V extends Any> = ReturnType<typeof map<K, V>>
export function map<K extends Any, V extends Any>(key: K, value: V) {
  return class extends Type("map", { key, value })<Map<Native<K>, Native<V>>> {
    static get(key: InstanceType<K>): InstanceType<V> {
      throw 0
    }
    static set(key: InstanceType<K>, value: InstanceType<V>): InstanceType<V> {
      throw 0
    }
  }
}
