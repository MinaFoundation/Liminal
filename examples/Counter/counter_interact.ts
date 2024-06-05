import * as L from "liminal"
import { signer } from "liminal/test"
import * as Counter from "./Counter.contract.ts"

using client = await L.client()
const sender = signer()

await L
  .tx(function*() {
    const counter = L.id.fromHex(Deno.env.get("COUNTER_ID")!).bind(Counter)
    for (let i = 0; i < 20; i++) {
      yield* counter.increment({ by: L.none })
    }
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
