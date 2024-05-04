import * as L from "liminal"
import * as spec from "./spec/mod.js"
import { TransferEvent, TransferProps } from "./spec/mod.js"

const tx = L.f(function*() {
  L.signer
  const [contract, from] = yield* L.signers("contract", "from")

  const deploy = new L.bool(true)
  const g = yield* deploy.ifElse(
    function*() {
      yield "hello" as const
      return 1
    },
    function*() {
      yield "Florian" as const
      return 1
    },
  )
  yield deploy.assert("yo")
  // yield* deploy.assertEquals(new L.bool(true), {})
  const to = new L.id(new Uint8Array())
  const randomError = new L.bool(false)

  yield* deploy.if(function*() {
    yield* contract.deploy(spec, true)
  })
  yield* randomError.if(function*() {
    yield TransferEvent.from("Initiated")
  })
  const assets = new L.id(new Uint8Array()).as(spec)
  const transferProps: TransferProps = {
    token: new L.u64(101),
    from,
    to,
    amount: new L.u64(1e9),
  }
  // yield new L.bool(true).not().assert("")
  yield* assets.transfer(transferProps)
  const prev = yield* assets.tokens.set(null!)
  const result = yield* assets.transfer(transferProps)
  yield TransferEvent.from("Result")
  return result
})
