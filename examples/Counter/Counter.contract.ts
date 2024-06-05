import * as L from "liminal"

export const count = L.u256.new(1)

export const increment = L.f({
  by: L.Union(L.u256, L.None),
}, function*({ by }) {
  const final = count.add(by.match(L.None, L.u256.new(1)))
  yield IncrementedEvent.new({
    initial: count,
    final,
  })
  return yield* count["="](final)
})

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  initial: L.u256,
  final: L.u256,
}) {}
