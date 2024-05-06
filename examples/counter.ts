import * as L from "liminal"

class Counter {
  count
  constructor() {
    this.count = new L.State(L.u8)
  }

  *increment() {
    const state = yield* this.count
    yield* this.count.set(state.add(L.u8.from(1)))
  }

  *decrement() {
    const state = yield* this.count
    yield* this.count.set(state.subtract(L.u8.from(1)))
  }
}

const tx = L.tx(function*() {
  const contractId = yield* L.id.from(new Uint8Array()).signer("contract")
  const counter = new Counter()
  const contract = yield* contractId.deploy(counter, {
    count: L.u8.from(1),
  })
  return contract
})
