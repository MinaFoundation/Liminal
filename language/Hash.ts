import { Any, Type, TypeNative, Value } from "./type.js"

export type HashAlgorithm =
  | "Keccak256"
  | "Keccak384"
  | "Keccak512"
  | "Poseidon"
  | "SHA2_256"
  | "SHA3_256"
  | "SHA3_384"
  | "SHA3_512"

export interface hash<A extends HashAlgorithm, T extends Any>
  extends ReturnType<typeof hash<A, T>>
{}
export function hash<A extends HashAlgorithm, T extends Any>(algorithm: A, type: T) {
  return class Instance extends Type("Hash", { algorithm, type })<TypeNative<T>> {
    static from(value: Value<T>) {
      return new this(value)
    }
  }
}
