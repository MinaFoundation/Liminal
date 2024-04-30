import { Catch, Effect } from "./Effect.js"
import { Any, Instance, Native, Type } from "./type.js"

export interface Enum<M extends Variants> extends Type<"enum", { variantTypes: M }> {
  new(value: EnumNative<M>): EnumValue<M>
}
export interface EnumValue<M extends Variants>
  extends Instance<"enum", { variantTypes: M }, EnumNative<M>>
{
  match: Match<M>
  expect: Expect<M>
}

export type Variants = Record<any, Any>

export type EnumNative<M extends Variants, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & { tag: K }
    & ([M[K]] extends [never] ? {} : { value: Native<M[K]> })
}[K]

enum_.name = "enum"
export function enum_<M extends Variants>(variantTypes: M): Enum<M> {
  return class extends Type("enum", {
    variantTypes,
  })<EnumNative<M>> {
    declare match: Match<M>
    declare expect: Expect<M>
  }
}

export type MatchArms<M extends Variants, O extends InstanceType<Any>> = {
  [K in keyof M]: (value: InstanceType<M[K]>) => O
}

export type Match<M extends Variants> = <O extends InstanceType<Any>>(arms: MatchArms<M, O>) => O

export type Expect<M extends Variants> = <K extends keyof M>(
  when: K,
) => Effect<
  InstanceType<M[K]>,
  Catch<{ [K2 in keyof M]: K2 extends K ? InstanceType<M[K2]> : never }[keyof M]>
>
