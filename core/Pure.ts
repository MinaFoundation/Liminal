import { unimplemented } from "../util/unimplemented.ts"
import { Result } from "./Call.ts"
import { Value } from "./Value.ts"
import { Vk, VkSource } from "./Vk.ts"

export function pure<P extends Value.PropTypes, T, R extends Result>(
  propTypes: P,
  statements: PureStatements<T, [props: Value.PropsResolved<P>], R>,
): PureType<P, T, R>
export function pure<T, R extends Result>(
  statements: PureStatements<T, [props: {}], R>,
): PureType<{}, T, R>
export function pure<T, R extends Result>(
  statements: PureStatements<T, [props: {}], R>,
): PureType<{}, T, R>
export function pure<P extends Value.PropTypes, T, R extends Result>(
  propTypesOrStatements: P | PureStatements<T, [props: {}], R>,
  maybeStatements?: PureStatements<T, [props: Value.PropsResolved<P>], R>,
): PureType<P, T, R> {
  return (typeof propTypesOrStatements === "function"
    ? pureInternal({}, propTypesOrStatements)
    : pureInternal(
      propTypesOrStatements as never,
      maybeStatements as never,
    )) as never
}

export type PureStatements<
  T,
  A extends unknown[],
  R extends Result,
> = R | ((this: T, ...args: A) => R)

export interface PureType<
  P extends Value.PropTypes = any,
  T = any,
  R extends Result = any,
> extends ReturnType<typeof pureInternal<P, T, R>> {}

export function pureInternal<
  P extends Value.PropTypes,
  T,
  R extends Result,
>(
  propTypes: P,
  statements: PureStatements<T, [props: Value.PropsResolved<P>], R>,
) {
  return class extends Value.make("Pure")<never, never, never> {
    propTypes = propTypes
    statements = statements
    vk = new Vk(new VkSource(this))

    run(): R {
      unimplemented()
    }
  }
}
