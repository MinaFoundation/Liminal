import * as L from "liminal"

export default class Counter {
  count = new L.State(L.u256);

  *increment() {
    const count = yield* this.count
    const incremented = count.add(L.u256.from(1))
    yield IncrementedEvent.of({ from: count, to: incremented })
    return yield* this.count.set(incremented)
  }
}

export class IncrementedEvent extends L.Struct("Incremented", {
  from: L.u256,
  to: L.u256,
}) {}
