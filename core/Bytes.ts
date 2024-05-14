import { Type } from "./Type.ts"

export function Bytes<Size extends number>(size: Size) {
  return class extends Type.make("Bytes", { size })<BytesSource, Uint8Array> {}
}

export type BytesSource = never
