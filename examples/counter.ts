import * as L from "liminal"

const state = L.state(L.u256)

const add = L.f(function*(value: L.u256) {
  const count = yield* state
  const next = count.add(value)
  return yield* state.set(next)
})

const subtract = L.f(function*(value: L.u256) {
  const count = yield* state
  const next = count.add(value)
  return yield* state.set(next)
})

const square = L.f(function*() {
  const count = yield* state
  const next = count.square()
  return yield* state.set(next)
})

const Counter = { add, subtract, square, state }

L.tx(function*() {
  const contract = yield* L.id
    .lift(new Uint8Array())
    .signer("contract")
    .deploy(Counter)
  contract.state
})
