import * as L from "liminal"

class Counter {
  count = new L.State(L.u8);

  *increment() {
    const count = yield* this.count
    yield* this.count.set(count.add(L.u8.from(1)))
  }

  *decrement() {
    const count = yield* this.count
    yield* this.count.set(count.subtract(L.u8.from(1)))
  }
}

const tx = L.tx(function*() {
  const contractId = yield* L.id.from(new Uint8Array()).signer("contract")
  const counter = new Counter()
  const contract = yield* contractId.deploy(counter, {
    count: L.u8.from(1),
  })
  return 2
})
