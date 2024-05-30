import * as L from "liminal"

export const count_ = L.u256.state()

export const increment = L.f({
  amount: L.Union(L.u256, L.None),
  initial: count_,
}, function*({ amount, initial }) {
  const final = initial.add(amount.case(L.None, L.u256.new(1)))
  yield IncrementedEvent.new({ initial, final })
  return yield* count_(final)
})

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  initial: L.u256,
  final: L.u256,
}) {}
