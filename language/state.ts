import { hash, HashAlgorithm } from "./Hash.js"
import { Any, Type, TypeNative, Value } from "./type.js"

export interface state<T extends Any = Any> extends ReturnType<typeof state<T>> {}
export function state<T extends Any>(type: T) {
  return class extends Type("state", { type })<State<TypeNative<T>>> {
    declare value: () => InstanceType<T>
    declare hash: <A extends HashAlgorithm>(algorithm: A) => InstanceType<hash<A, T>>
    declare set: (value: Value<T>) => InstanceType<T>
  }
}

export interface State<T> {
  fetchValue(): Promise<T>
  fetchHash(algorithm: HashAlgorithm): Promise<Uint8Array>
}
