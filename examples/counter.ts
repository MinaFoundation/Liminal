import * as L from "liminal"

const state = new L.State(L.u256)

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
  // yield* L.event("something", next)
  return yield* state.set(next)
})

const Counter = { add, subtract, square, state }

const tx = L
  .tx(function*() {
    const contractId = yield* L.id.of(new Uint8Array()).signer("contract")
    const contract = yield* contractId.deploy(Counter)
    return contract
  })
