import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({ act })

export function* act(this: Contract, action: spec.Action) {
  const count = this.count.clone()
  const next = action.match({
    Add(value) {
      return count.add(value)
    },
    Divide(value) {
      return count.divide(value)
    },
    Multiply(value) {
      return count.multiply(value)
    },
    Square() {
      return count.square()
    },
    Subtract(value) {
      return count.subtract(value)
    },
  })
  return this.count.set(next)
}
