import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({ create })

function* create(this: Contract, value: spec.CreateProps) {
  const condition = new L.bool(false)
  yield condition.assert(
    new spec.CreateError({ tag: "InsufficientFunds" }),
  )
  return new spec.CreateResult({
    tag: "Value",
    value: {
      id: 1,
    },
  })
}
