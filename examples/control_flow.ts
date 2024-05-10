import * as L from "liminal"

declare const a: L.u8 | L.None

declare const maybe: L.u8 | L.None

{
  // Matching values: we match the `None` case and return a new value.
  const value = maybe.match(L.None, function*() {
    return L.u8.from(0)
  })
  value satisfies L.u8
}

{
  // Unhandling values: if `None` is matched, Liminal yields to the caller of `unhandle`.
  function* unhandle() {
    const value = yield* maybe.unhandle(L.None)
    value satisfies L.u8
    return value
  }
  unhandle satisfies () => Generator<L.None, L.u8, unknown>
}

{
  // Create an effect, without yielding.
  const effect = maybe.unhandle(L.None)
  effect satisfies L.Effect<L.None, L.u8>

  // Handle values that were yielded from the call that produced the effect.
  const handled = effect.handle(L.None, function*() {
    return L.u8.from(0)
  })
  handled satisfies L.u8

  // Match and move an effect's yielded value back to the result channel.
  const rehandled = effect.rehandle(L.None)
  rehandled satisfies L.u8 | L.None
}