import crypto from "node:crypto"
import { ArrayOfLength } from "../util/ArrayOfLength.ts"

export function signer(): TestSigner
export function signer(count: 1): TestSigner
export function signer<C extends number>(count: C): ArrayOfLength<TestSigner, C>
export function signer(count?: number): TestSigner | TestSigner[] {
  if (!count || count === 1) return TestSigner()
  return Array.from({ length: count }, TestSigner)
}

export interface TestSigner {
  publicKey: Uint8Array
  (tx: Uint8Array): Uint8Array
}

// TODO: get signing actually working at some point
export function TestSigner(): TestSigner {
  const pair = crypto.generateKeyPairSync("ec", { namedCurve: "secp256k1" })
  const publicKey = new Uint8Array(pair.publicKey.export({ format: "der", type: "sec1" }))
  return Object.assign((tx: Uint8Array) => crypto.sign(null, tx, pair.privateKey), { publicKey })
}
