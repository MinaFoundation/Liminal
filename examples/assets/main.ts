import * as L from "liminal"
import * as spec from "./spec/mod.js"
import { TransferEvent, TransferProps } from "./spec/mod.js"

const tx = L.f(
  function*({ from, contract: contractId }: {
    from: L.signer<"from">
    contract: L.signer<"contract">
  }) {
    const deploy = L.bool.from(true)
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
    // yield* deploy.assertEquals(new L.bool(true), {})
    const to = L.id.from(new Uint8Array())
    const randomError = L.bool.from(false)

    yield* deploy.if(function*() {
      yield* contractId.deploy(spec)
    })
    const assets = yield* contractId.bind(spec)
    yield* randomError.if(function*() {
      yield TransferEvent.from("Initiated")
    })
    const transferProps: TransferProps = {
      token: L.u64.from(101),
      from,
      to,
      amount: L.u64.from(1e9),
    }
    // yield new L.bool(true).not().assert("")
    yield* assets.transfer(transferProps)
    const prev = yield* assets.tokens.set(null!, null!)
    const result = yield* assets.transfer(transferProps)
    yield TransferEvent.from("Result")
    return result
  },
)
