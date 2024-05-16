import * as L from "liminal"

export function* add() {
  const { a, b } = yield* L.use({ a: L.u256, b: L.u256 })
  return a.add(b)
}

const x = L.gen(add, {
  a: L.u256.new(0),
})
const y = L.gen(x, {
  b: L.u256.new(1),
})
