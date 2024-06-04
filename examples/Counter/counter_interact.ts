import * as L from "liminal"
import { signer } from "liminal/test"
import * as Counter from "./Counter.contract.ts"

using client = await L.client()
const sender = signer()

const finalization = await L
  .tx(function*() {
    const counter = L.id.fromHex(Deno.env.get("COUNTER_ID")!).bind(Counter)
    const initial = counter.count_
    yield* counter.increment({ amount: L.none })
    yield* counter.increment({ amount: L.none })
    yield* counter.increment({ amount: L.none })
    return initial
  })
  .sign(sender)
  .run((event) => {
    if (event.tag === "Incremented") {
      const { initial, final } = event
      console.log(`Incremented from ${initial} to ${final}.`)
    }
  })
  .commit(client)
  .finalized()

finalization.result satisfies number
