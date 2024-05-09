import * as L from "liminal"

declare const maybe: L.u8 | L.None

function match() {
  const value = maybe.match(L.None, function*() {
    return L.u8.from(0)
  })
  value satisfies L.u8
}

function* unhandle() {
  const value = yield* maybe.unhandle(L.None)
  value satisfies L.u8
  return value
}
unhandle satisfies () => Generator<L.None, L.u8, unknown>

function handle() {
  const effect = maybe.unhandle(L.None)
  effect satisfies L.Effect<L.None, L.u8>

  const handled = effect.handle(L.None, function*() {
    return L.u8.from(0)
  })
  handled satisfies L.u8

  const rehandled = effect.rehandle(L.None)
  rehandled satisfies L.u8 | L.None
}
