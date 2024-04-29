import { Native, top, Type } from "./type.js"

export type Variants = Record<any, top>

export type EnumNative<M extends Variants, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & { tag: K }
    & ([M[K]] extends [never] ? {} : { value: Native<M[K]> })
}[K]

export function enum_<M extends Variants>(variantTypes: M) {
  return class extends Type("enum", {
    variantTypes,
  })<EnumNative<M>> {
    declare match: <O extends InstanceType<top>>(arms: MatchArms<M, O>) => O
  }
}
enum_.name = "enum"

export type MatchArms<M extends Variants, O extends InstanceType<top>> = {
  [K in keyof M]: (...rest: M[K] extends top ? [InstanceType<M[K]>] : []) => O
}
