import * as L from "liminal"

export default class Counter {
  count = new L.State(L.u256);

  *increment() {
    const incremented = this.count.value.add(L.u256.from(1))
    yield new IncrementedEvent({
      from: this.count.value,
      to: incremented,
    })
    return yield* this.count.set(incremented)
  }
}

export class IncrementedEvent extends L.Struct({
  event: L.constant("Incremented"),
  from: L.u256,
  to: L.u256,
}) {}
