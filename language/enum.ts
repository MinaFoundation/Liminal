import { Catch, Effect, keys } from "./Effect.js"
import { Any, Instance, Native, Type } from "./type.js"

export interface EnumType<M extends Variants> extends Type<"enum", { variantTypes: M }> {
  new(value: EnumNative<M>): Enum<M>
}
export interface Enum<M extends Variants>
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
export function enum_<M extends Variants>(variantTypes: M): EnumType<M> {
  return class extends Type("enum", { variantTypes })<EnumNative<M>> {
    declare match: Match<M>
    declare expect: Expect<M>
  }
}

export type MatchArms<M extends Variants, O extends InstanceType<Any>> = {
  [K in keyof M]: (value: InstanceType<M[K]>) => O
}

export type Match<M extends Variants> = <
  This extends Enum<M>,
  O extends InstanceType<Any>,
>(
  this: This,
  arms: MatchArms<M, O>,
) => O

export type Expect<M extends Variants> = <
  This extends Enum<M>,
  K extends keyof M,
  R extends [key?: keyof any],
>(
  this: This,
  when: K,
  ...rest: R
) => Effect<
  M[K],
  Catch<
    R extends [infer K] ? K : keys["Expect"],
    { [K2 in keyof M]: K2 extends K ? M[K2] : never }[keyof M]
  >
>
