import { NativeType, top, type } from "./type.js"

export type TupleNativeType<M extends top[]> = {
  [K in keyof M]: NativeType<M[K]>
}

export function tuple<M extends top[]>(...memberTypes: M) {
  return class extends type("tuple")<TupleNativeType<M>> {
    readonly members = memberTypes

    constructor(...members: TupleNativeType<M>) {
      super(members)
    }
  }
}
