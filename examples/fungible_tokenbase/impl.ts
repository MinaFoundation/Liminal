import * as L from "liminal"
import * as spec from "./spec.js"

export class Context extends L.impl(spec, {
  someState: L.vec(L.u8),
}) {}

export default new Context({
  create() {
    return new spec.CreateResult({
      tag: "Value",
      value: { id: 1 },
    })
  },
})
