import * as L from "liminal"
import { signer } from "liminal/test"
import Counter from "./Counter.js"

using client = await L.Client()
const sender = signer()

const finalization = await L
  .tx(function*() {
    const counter = L.id
      .from(new TextEncoder().encode(process.argv[0]))
      .bind(new Counter())
    yield* counter.increment()
    yield* counter.increment()
    yield* counter.increment()
    return counter.count
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
