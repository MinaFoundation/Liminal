import { Factory, Type } from "./Type.ts"

export function Hash<T extends Type, A extends HashAlgorithm>(
  targetType: Factory<T>,
  algorithm: A,
) {
  return Type.make("Hash", { targetType, algorithm })<HashSource, Uint8Array, never, never>
}

export type HashAlgorithm =
  | "Keccak256"
  | "Keccak384"
  | "Keccak512"
  | "Poseidon"
  | "SHA2_256"
  | "SHA3_256"
  | "SHA3_384"
  | "SHA3_512"

export type HashSource = never
