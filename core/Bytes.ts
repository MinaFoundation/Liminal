import { Type } from "./Type.ts"

export function Bytes<Size extends number>(size: Size) {
  return class extends Type.make("Bytes")<BytesSource, Uint8Array> {
    size = size
  }
}

export type BytesSource = never
