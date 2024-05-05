import { Type } from "./Type.js"

export function Hash<T extends Type, A extends HashAlgorithm>(
  targetType: new() => T,
  algorithm: A,
) {
  return class extends Type<
    "Hash",
    Uint8Array,
    {
      targetType: new() => T
      algorithm: A
    },
    never,
    never
  > {
    constructor() {
      super("Hash", { targetType, algorithm })
    }
  }
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
