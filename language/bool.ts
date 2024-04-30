import { Catch, Effect } from "./Effect.js"
import { Any, Type } from "./type.js"

export class bool extends Type("bool", {})<boolean> {
  declare if: <E extends Any>(if_: () => Effect<void, E>) => Effect<void, E>

  declare ifElse: <T extends Any>(
    if_: () => InstanceType<T>,
    else_: () => InstanceType<T>,
  ) => T

  declare assert: <H extends keyof any>(
    handle: H,
  ) => Catch<typeof bool, H, never>

  declare not: () => bool
}
