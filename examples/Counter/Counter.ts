import * as L from "liminal"

export default class Counter {
  count = L.u256.state();

  *increment() {
    const incremented = this.count.add(L.u256.from(1))
    yield IncrementedEvent.from({ from: this.count, to: incremented })
    return yield* this.count.assign(incremented)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: L.const("Incremented"),
  from: L.u256,
  to: L.u256,
}) {}
