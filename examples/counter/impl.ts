import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({ act })

function* x() {
  const y = yield* new L.bool(true).assert(new L.u64(1))
  const z = yield* L.event("HELLO!", y)
  const g = yield* L.dep("someDep", L.u8)
}

export function* act(this: Contract, action: spec.Action) {
  const sender = yield* L.sender
  const x = L.Some(L.pk)(new Uint8Array())
  const count = this.count.clone()
  const next = action.match({
    Add(value) {
      value.unwrapOr
      return count.add(
        value.unwrapOr(new L.u64(1)),
      )
    },
    Divide(value) {
      const x = value.expect("None")
      return count.divide(
        value.unwrapOr(new L.u64(1)),
      )
    },
    Multiply(value) {
      return count.multiply(
        value.unwrapOr(new L.u64(1)),
      )
    },
    Square() {
      return count.square()
    },
    Subtract(value) {
      return count.subtract(
        value.unwrapOr(new L.u64(1)),
      )
    },
  })
  return this.count.set(next)
}
