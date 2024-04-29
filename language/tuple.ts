import { Any, Native, Type } from "./type.js"

export type TupleNative<M extends Any[]> = {
  [K in keyof M]: Native<M[K]>
}

export function tuple<M extends Any[]>(...memberTypes: M) {
  return Type("tuple", { memberTypes })<TupleNative<M>>
}
