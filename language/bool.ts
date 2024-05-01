import { Catch } from "./Effect.js"
import { Any, Type } from "./type.js"

export class bool extends Type("bool", {})<boolean> {
  declare if: <T, O>(if_: () => Generator<T, O>) => Generator<T, O>

  declare ifElse: <T extends Any>(
    if_: () => InstanceType<T>,
    else_: () => InstanceType<T>,
  ) => T

  declare assert: <H extends keyof any>(handle: H) => Catch<typeof bool, H, never>

  declare not: () => bool
}
