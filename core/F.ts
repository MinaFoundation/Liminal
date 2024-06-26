import { unimplemented } from "../util/unimplemented.ts"
import { Result } from "./Call.ts"
import { Effect } from "./Effect.ts"
import { PureProxy, SignerRequirement } from "./Id.ts"
import { Value } from "./Value.ts"
import { Vk, VkSource } from "./Vk.ts"

export function f<P extends Value.PropTypes, T, Y extends Value, R extends Result>(
  propTypes: P,
  statements: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
): FType<P, T, Y, R>
export function f<T, Y extends Value, R extends Result>(
  statements: EffectStatements<T, [props: {}], Y, R>,
): FType<{}, T, Y, R>
export function f<P extends Value.PropTypes, T, Y extends Value, R extends Result>(
  propTypesOrStatements: P | EffectStatements<T, [props: {}], Y, R>,
  maybeStatements?: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
): FType<P, T, Y, R> {
  return (typeof propTypesOrStatements === "function"
    ? fInternal({}, propTypesOrStatements)
    : fInternal(
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

export interface FType<
  P extends Value.PropTypes = any,
  T = any,
  Y extends Value = any,
  R extends Result = any,
> extends ReturnType<typeof fInternal<P, T, Y, R>> {}

export interface f<
  P extends Value.PropTypes = any,
  T = any,
  Y extends Value = any,
  R extends Result = any,
> extends InstanceType<FType<P, T, Y, R>> {}

export function fInternal<
  P extends Value.PropTypes,
  T,
  Y extends Value,
  R extends Result,
>(
  propTypes: P,
  statements: EffectStatements<T, [props: Value.PropsResolved<P>], Y, R>,
) {
  return class extends Value.make("f")<never, string, FFrom<P>> {
    propTypes = propTypes
    statements = statements
    vk = new Vk(new VkSource(this))

    run(): Effect<Y, R> {
      unimplemented()
    }

    authorize<K extends Extract<Y, SignerRequirement>["key"]>(
      _key: K,
      _authority: Value.Args<[PureProxy]>[0],
    ): f<P, T, Exclude<Y, SignerRequirement<K>>, R> {
      unimplemented()
    }

    sign<K extends string>(_key: K): f<P, T, Y | SignerRequirement<K>, R> {
      unimplemented()
    }
  }
}

export type FFrom<P extends Value.PropTypes = any> = {
  [K in keyof P]:
    | InstanceType<P[K]>
    | Value.From<InstanceType<P[K]>>
    | Value.Native<InstanceType<P[K]>>
}
