import { Native, top, Type } from "./type.js"

export type TupleNative<M extends top[]> = {
  [K in keyof M]: Native<M[K]>
}

export function tuple<M extends top[]>(...memberTypes: M) {
  return Type("tuple", { memberTypes })<TupleNative<M>>
}
