import * as L from "liminal"

export function* add() {
  const { a, b } = yield* L.use({
    a: L.u256,
    b: L.u256,
  })
  return a.add(b)
}

add satisfies () => Generator<
  L.Use<{ a: L.u256; b: L.u256 }>,
  L.u256,
  unknown
>

const partial = L.branch(add, {
  a: L.u256.new(0),
})

partial.rehandle(L.Use) satisfies
  | L.u256
  | L.Use<{ b: L.u256 }>

partial satisfies L.Effect<
  L.Use<{ b: L.u256 }>,
  L.u256
>

const final = L.branch(partial, {
  b: L.u256.new(0),
})

final satisfies L.Effect<never, L.u256>
