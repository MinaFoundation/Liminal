import { AssertError } from "./asserts.js"
import { Any, Type } from "./type.js"

export class bool extends Type("bool", {})<boolean> {
  declare if: <T>(if_: () => Generator<T, void>) => Generator<T, void>

  declare ifElse: <YI, YE, O>(
    if_: () => Generator<YI, O>,
    else_: () => Generator<YE, O>,
  ) => Generator<YI | YE, O>

  declare assert: <T>(value: T) => Generator<AssertError<T>, void, never>
  // TODO: get the following working:
  // assert<T>(value: T) {
  //   return this.assertEquals(new bool(true), value)
  // }

  declare not: () => bool
}
