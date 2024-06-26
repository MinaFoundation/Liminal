import * as L from "liminal"

declare const maybe: L.u8 | L.None

{
  // Matching values: we match the `None` case and return a new value.
  const value = maybe.match(L.None, L.u8.new(0))
  value satisfies L.u8
}

{
  // Unhandling values: if `None` is matched, Liminal yields to the caller of `unhandle`.
  function* unhandle() {
    const value = yield* maybe["?"](L.None)
    value satisfies L.u8
    return value
  }
  unhandle satisfies () => Generator<L.None, L.u8, unknown>
}

{
  // Create an effect, without yielding.
  const effect = maybe["?"](L.None)
  effect satisfies L.Effect<L.None, L.u8>

  // Handle values that were yielded from the call that produced the effect.
  const handled = effect.catch(L.None, L.u8.new(0))
  handled satisfies L.Effect<L.None, L.u8>

  const matched = handled.match(L.u8, L.u256.new(1))
  matched satisfies L.Effect<never, L.u256>
}

{
  // Chained unhandling.
  const chained = maybe
    ["?"](L.u8)
    ["?"](L.None)
  chained satisfies L.Effect<L.u8 | L.None, never>
}
