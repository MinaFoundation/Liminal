import { Native, top, Type } from "./type.js"

export type map<K extends top, V extends top> = ReturnType<typeof map<K, V>>
export function map<K extends top, V extends top>(key: K, value: V) {
  return class extends Type("map", { key, value })<Map<Native<K>, Native<V>>> {
    static get(key: InstanceType<K>): InstanceType<V> {
      throw 0
    }
    static set(key: InstanceType<K>, value: InstanceType<V>): InstanceType<V> {
      throw 0
    }
  }
}
