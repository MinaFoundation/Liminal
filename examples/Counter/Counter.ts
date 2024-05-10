import * as L from "liminal"

export default class Counter {
  count = L.State(L.u256);

  *increment() {
    const incremented = this.count.add(L.u256.from(1))
    yield IncrementedEvent.of({ from: this.count, to: incremented })
    return yield* L.setState(this.count, incremented)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: L.const("Incremented"),
  from: L.u256,
  to: L.u256,
}) {}
