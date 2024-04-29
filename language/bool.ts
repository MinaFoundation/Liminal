import { Effect } from "./Effect.js"
import { Catch } from "./enum.js"
import { Any, Type } from "./type.js"

export class bool extends Type("bool", {})<boolean> {
  declare if: <T extends Any>(if_: () => Effect<void, T>) => Effect<void, void>
  declare ifElse: <T extends Any>(
    if_: () => InstanceType<T>,
    else_: () => InstanceType<T>,
  ) => T
  declare assert: <E extends Any>(error: InstanceType<E>) => Effect<bool, Catch<E>>
  declare not: () => bool
}
