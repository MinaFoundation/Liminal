import { Any, Type, TypeNative } from "./type.js"

export function map<K extends Any, V extends Any>(
  keyType: K,
  valueType: V,
) {
  return class
    extends Type("map", { keyType, valueType })<MerkleMap<TypeNative<K>, TypeNative<V>>>
  {}
}

export class MerkleMap<K, V> {}
