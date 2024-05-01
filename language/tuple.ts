import { Any, Type, TypeNative } from "./type.js"

export type TupleNative<M extends Any[]> = {
  [K in keyof M]: TypeNative<M[K]>
}

export function tuple<M extends Any[]>(...memberTypes: M) {
  return Type("tuple", { memberTypes })<TupleNative<M>>
}
