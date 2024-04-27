import { Native, top, type } from "./type.js"

export type TupleNative<M extends top[]> = {
  [K in keyof M]: Native<M[K]>
}

export function tuple<M extends top[]>(...memberTypes: M) {
  return class extends type("tuple")<TupleNative<M>> {
    readonly members = memberTypes
  }
}
