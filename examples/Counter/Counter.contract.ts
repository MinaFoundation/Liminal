import * as L from "liminal"

export class Counter {
  count = L.u256.state();

  *increment() {
    const incremented = this.count().add(L.u256.new(1))
    yield IncrementedEvent.new({
      from: this.count(),
      to: incremented,
    })
    return this.count(incremented)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  from: L.u256,
  to: L.u256,
}) {}
