import * as L from "liminal"

export default class Counter {
  count = new L.State(L.u256);

  *increment() {
    const incremented = this.count.value.add(L.u256.from(1))
    yield IncrementedEvent.of({
      from: this.count.value,
      to: incremented,
    })
    return yield* this.count.set(incremented)
  }
}

export class IncrementedEvent extends L.Struct("Incremented", {
  from: L.u256,
  to: L.u256,
}) {}
