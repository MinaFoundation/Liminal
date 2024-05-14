import * as L from "liminal"
import { signer } from "liminal/test"
import { Counter } from "./Counter.contract.ts"

using client = await L.client()
const sender = signer()

const finalization = await L
  .tx(function*() {
    const counter = L.id.fromHex(Deno.env.get("COUNTER_ID")!).bind(new Counter())
    const initial = yield* counter.count()
    yield* counter.increment()
    yield* counter.increment()
    yield* counter.increment()
    return initial
  })
  .sign(sender)
  .run((event) => {
    if (event.tag === "Incremented") {
      const { from, to } = event
      console.log(`Incremented from ${from} to ${to}.`)
    }
  })
  .commit(client)
  .finalized()

finalization.result satisfies number
