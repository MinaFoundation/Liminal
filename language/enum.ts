import { Effect } from "./Effect.js"
import { Any, Native, Type } from "./type.js"

export type Variants = Record<any, Any>

export type EnumNative<M extends Variants, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & { tag: K }
    & ([M[K]] extends [never] ? {} : { value: Native<M[K]> })
}[K]

enum_.name = "enum"
export function enum_<M extends Variants>(variantTypes: M) {
  return class extends Type("enum", {
    variantTypes,
  })<EnumNative<M>> {
    declare match: <O extends InstanceType<Any>>(arms: MatchArms<M, O>) => O

    declare expect: <K extends keyof M>(
      when: K,
    ) => Effect<
      M[K],
      Catch<{ [K2 in keyof M]: K2 extends K ? never : M[K2] }[keyof M]>
    >
  }
}

export type Catch<T> = { catch: T }

export type MatchArms<M extends Variants, O extends InstanceType<Any>> = {
  [K in keyof M]: (value: InstanceType<M[K]>) => O
}
