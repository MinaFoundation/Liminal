import { Catch, Effect } from "./Effect.js"
import { Any, Native, Type } from "./type.js"

export interface EnumType<M extends Variants> extends ReturnType<typeof enum_<M>> {}
export function enum_<M extends Variants>(variantTypes: M) {
  return class extends Type("enum", { variantTypes })<EnumNative<M>> {
    match: <O extends InstanceType<Any>>(arms: MatchArms<M, O>) => O

    expect: <K extends keyof M, H extends keyof any>(
      tag: K,
      otherwise: H,
    ) => Catch<M[K], H, { [K2 in keyof M]: K2 extends K ? never : M[K2] }[keyof M]>
  }
}
enum_.name = "enum"

export interface Enum<M extends Variants> extends InstanceType<EnumType<M>> {}

export type Variants = Record<any, Any>

export type EnumNative<M extends Variants, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & { tag: K }
    & ([M[K]] extends [never] ? {} : { value: Native<M[K]> })
}[K]

export type MatchArms<M extends Variants, O extends InstanceType<Any>> = {
  [K in keyof M]: (value: InstanceType<M[K]>) => O
}
