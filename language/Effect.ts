import { Keys } from "../util/keys.js"
import { U2I } from "../util/U2I.js"
import { Enum, Variants } from "./enum.js"
import { Any } from "./type.js"

export class Effect<T extends Any, E> implements Generator<E, T, unknown> {
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
    f: (caught: Caught<E>) => InstanceType<T>,
  ) => InstanceType<T>
}

export type Catch<K extends keyof any = any, T extends Any = Any> = {
  catch: { [_ in K]: T }
}

export interface Caught<E> extends Enum<Extract<U2I<Extract<E, Catch>["catch"]>, Variants>> {}

export class keys extends Keys({
  Expect: Symbol(),
  Unwrap: Symbol(),
}) {}
