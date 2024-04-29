import { Any, Native, Type } from "./type.js"

export type item<T extends Any = Any> = ReturnType<typeof item<T>>
export function item<T extends Any>(t: T) {
  return class extends Type("item", { type: t })<Native<T>> {
    static fetch(): Promise<Native<T>> {
      throw 0
    }
    static fetchHash(): Promise<Uint8Array> {
      throw 0
    }
  }
}
