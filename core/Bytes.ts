import { Value } from "./Value.ts"

export function Bytes<Size extends number>(size: Size) {
  return class extends Value.make("Bytes")<BytesSource, Uint8Array> {
    size = size
  }
}

export type BytesSource = never
