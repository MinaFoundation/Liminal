import { Constructor, Type } from "../Type/Type.js"

export function Hash<T extends Type, A extends HashAlgorithm>(
  targetType: Constructor<T>,
  algorithm: A,
) {
  return Type.make("Hash", { targetType, algorithm })<Uint8Array, never, never>
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
