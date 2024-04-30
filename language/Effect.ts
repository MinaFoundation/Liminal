import { U2I } from "../util/U2I.js"
import { Enum, Variants } from "./enum.js"
import { Any } from "./type.js"

export class Effect<T, E> implements Generator<E, T, unknown> {
  next(): IteratorResult<E, T> {
    throw 0
  }

  return(): IteratorResult<E, T> {
    throw 0
  }

  throw(): IteratorResult<E, T> {
    throw 0
  }

  [Symbol.iterator](): Generator<E, T, unknown> {
    throw 0
  }

  catch: (
    this: T extends Any ? Effect<T, E> : never,
    f: (caught: Caught<E>) => InstanceType<Extract<T, Any>>,
  ) => InstanceType<Extract<T, Any>>
}

export interface Catch<T extends Any = Any, K extends keyof any = any, U extends Any = Any>
  extends Effect<T, { catch: { [_ in K]: U } }>
{}

export interface Caught<E> extends Enum<Extract<U2I<Extract<E, Catch>["catch"]>, Variants>> {}
