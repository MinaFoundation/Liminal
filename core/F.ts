import { unimplemented } from "../util/unimplemented.ts"
import { Authority } from "./Authority.ts"
import { Result } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { SignerRequirement } from "./Id.ts"
import { Value } from "./Value.ts"
import { Vk, VkSource } from "./Vk.ts"

export function effect<P extends Value.PropTypes, T, Y extends Value, R extends Result>(
  propTypes: P,
  statements: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
): EffectType<P, T, Y, R>
export function effect<T, Y extends Value, R extends Result>(
  statements: EffectStatements<T, [props: {}], Y, R>,
): EffectType<{}, T, Y, R>
export function effect<P extends Value.PropTypes, T, Y extends Value, R extends Result>(
  propTypesOrStatements: P | EffectStatements<T, [props: {}], Y, R>,
  maybeStatements?: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
): EffectType<P, T, Y, R> {
  return (typeof propTypesOrStatements === "function"
    ? effectInternal({}, propTypesOrStatements)
    : effectInternal(
      propTypesOrStatements as never,
      maybeStatements as never,
    )) as never
}

export type EffectStatements<
  T,
  A extends unknown[],
  Y extends Value,
  R extends Result,
> = Generator<Y, R> | ((this: T, ...args: A) => Generator<Y, R>)

export interface EffectType<
  P extends Value.PropTypes = any,
  T = any,
  Y extends Value = any,
  R extends Result = any,
> extends ReturnType<typeof effectInternal<P, T, Y, R>> {}

export function effectInternal<
  P extends Value.PropTypes,
  T,
  Y extends Value,
  R extends Result,
>(
  propTypes: P,
  statements: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
) {
  return class extends Value.make("Effect")<never, string, EffectFrom<P>> {
    propTypes = propTypes
    statements = statements
    vk = new Vk(new VkSource(this))

    run(): Effect<Y, R> {
      unimplemented()
    }

    authorize<K extends Extract<Y, SignerRequirement>["key"]>(
      _key: K,
      _authority: Value.Args<[Authority]>[0],
    ): InstanceType<EffectType<P, T, Exclude<Y, SignerRequirement<K>>, R>> {
      unimplemented()
    }
  }
}

export type EffectFrom<P extends Value.PropTypes = any> = {
  [K in keyof P]:
    | InstanceType<P[K]>
    | Value.From<InstanceType<P[K]>>
    | Value.Native<InstanceType<P[K]>>
}
