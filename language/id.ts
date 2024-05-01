import { Type } from "./type.js"

export enum IdFlags {
  Default = 0,
  Signer = 1,
}

export function id_<F extends IdFlags>(flags: F) {
  return Type("id", { flags })<Uint8Array>
}

export class id extends id_(IdFlags.Default) {}

export class signer extends id_(IdFlags.Signer) {}
