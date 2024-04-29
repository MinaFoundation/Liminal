import { Effect, Env, NodeGenerator, Trap } from "../Effect.js"
import { Result } from "../result.js"
import { top } from "../type.js"

export declare function statements<T extends top, E extends top, X>(
  f: () => Effect<T, Env<Trap<E>, X>>,
): Effect<Result<T, E>, X>
export declare function statements<Y extends top, R extends top, E extends top, X>(
  f: () => NodeGenerator<Y, R, unknown, Env<Trap<E>, X>>,
): NodeGenerator<Result<Y, E>, Result<R, E>, unknown, X>
