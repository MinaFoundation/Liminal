import * as L from "liminal"
import * as spec from "./spec.js"

class Contract extends L.impl(spec) {}

export default new Contract({ create })

function* create(this: Contract, value: spec.CreateProps) {
  const condition = new L.bool(false)
  yield* condition.assert("InsufficientFunds")
  const y = spec.CreateResult.from("Ok", { id: 1 })
  const z = new spec.CreateResult({
    tag: "Ok",
    value: { id: 1 },
  })
  return new spec.CreateResult({
    tag: "Ok",
    value: { id: 1 },
  })
}

class MaybeU8 extends L.OptionType(L.u8) {}

function* another(this: Contract, value: spec.CreateProps) {
  const maybe = new MaybeU8({
    tag: "Some",
    value: 1,
  })
  const y = maybe.expect("Some", "Kaboom")
  const x = L.catch(y, {
    Kaboom() {
      return new L.u8(1)
    },
  })
}
