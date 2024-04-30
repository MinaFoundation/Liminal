import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({
  *act(action) {
    const count = this.count.value()
    const next = action.match({
      Add(value) {
        return count.add(value.unwrapOr(new L.u64(1)))
      },
      Divide(value) {
        return count.divide(value.unwrapOr(new L.u64(1)))
      },
      Multiply(value) {
        return count.multiply(value.unwrapOr(new L.u64(1)))
      },
      Square() {
        return count.square()
      },
      Subtract(value) {
        return count.subtract(value.unwrapOr(new L.u64(1)))
      },
    })
    return yield* this.count.set(next)
  },
})

function* x(this: Contract) {
  const maybeError = new L.bool(true).assert("Kaboom")
  const maybeErrorEffect = L.effect(maybeError)
  const y = maybeErrorEffect.catch({
    Kaboom() {
      return new L.bool(true)
    },
  })
  yield* L.event("HELLO!", y)
  const g = yield* L.dep("someDep", L.u8)
}
