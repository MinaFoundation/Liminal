import * as L from "liminal"
import { TestSigner } from "liminal/test"
import Counter from "./Counter.js"

using client = await L.Client()
const sender = TestSigner()

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
  .run((v) => {
    v
  })
  .commit(client)
  .finalized()

finalization.result satisfies number
