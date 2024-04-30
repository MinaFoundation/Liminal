import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({ act })

function* x() {
  const mightError = new L.bool(true).assert("Kaboom")
  const y = L.catch(mightError, {
    Kaboom: () => new L.bool(true),
  })
  yield* L.event("HELLO!", y)
  const g = yield* L.dep("someDep", L.u8)
}
function* z() {
  const d = x()
}

export function* act(this: Contract, action: spec.Action) {
  const x = L.Some(L.pk, new Uint8Array())
  const count = this.count.value()
  const next = action.match({
    Add(value) {
      const x = value.unwrapOr(new L.u64(1))
      return count.add(
        value.unwrapOr(new L.u64(1)),
      )
    },
    Divide(value) {
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
