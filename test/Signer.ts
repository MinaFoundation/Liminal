import crypto from "node:crypto"

export interface TestSigner {
  publicKey: Uint8Array
  (tx: Uint8Array): Uint8Array
}

export function TestSigner(): TestSigner {
  // TODO: get this actually working
  const pair = crypto.generateKeyPairSync("ec", { namedCurve: "secp256k1" })
  const publicKey = new Uint8Array(pair.publicKey.export({
    format: "der",
    type: "sec1",
  }))
  return Object.assign((tx: Uint8Array) => crypto.sign(null, tx, pair.privateKey), { publicKey })
}
