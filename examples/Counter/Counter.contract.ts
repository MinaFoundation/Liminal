import * as L from "liminal"

export class Counter {
  count = L.u256.state();

  *increment() {
    const from = yield* this.count()
    console.log({ from })
    const to = from.add(L.u256.new(1))
    yield IncrementedEvent.new({ from, to })
    return yield* this.count(to)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  from: L.u256,
  to: L.u256,
}) {}
