import * as L from "liminal"

export class Counter {
  count = L.u256.state();

  *increment() {
    const { amount } = yield* L.use({ amount: L.Union(L.u256, L.None) })
    const from = yield* this.count()
    const to = from.add(amount.case(L.None, L.u256.new(1)))
    yield IncrementedEvent.new({ from, to })
    return yield* this.count(to)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  from: L.u256,
  to: L.u256,
}) {}
