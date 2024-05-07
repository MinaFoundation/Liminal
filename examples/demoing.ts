import * as L from "liminal"

class Counter {
  count = new L.State(L.u256);

  *increment() {
    const count = yield* this.count
    const incremented = count.add(L.u256.from(1))
    yield new IncrementedEvent({
      from: count,
      to: incremented,
    })
    return yield* this.count.set(incremented)
  }
}

export class IncrementedEvent extends L.Struct({
  from: L.u256,
  to: L.u256,
}) {}

declare const deployerPk: Uint8Array

const x = L.tx(function*() {
  const deployer = yield* L.id.from(deployerPk).signer("deployer")
  const count = L.u256.from(0)
  const deployed = yield* deployer.deploy(new Counter(), { count })
  yield* deployed.increment()
})
