import { HashAlgorithm } from "./Hash.js"
import { Any, Type, TypeNative } from "./type.js"

export interface state<T extends Any = Any> extends ReturnType<typeof state<T>> {}
export function state<T extends Any>(type: T) {
  return class extends Type("state", { type })<State<TypeNative<T>>> {
    declare set: <Y>(value: InstanceType<T>) => Generator<Mutation, InstanceType<T>>
  }
}

export interface State<T> {
  fetchValue(): Promise<T>
  fetchHash(algorithm: HashAlgorithm): Promise<Uint8Array>
}

export class Mutation {
  readonly tag = "Mutation"
}
