import { Type } from "../Type/Type.js"

export function Bytes<Size extends number>(size: Size) {
  return class extends Type.make("Bytes", { size })<Uint8Array> {}
}
