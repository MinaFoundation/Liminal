import * as L from "liminal"
import { signer } from "liminal/test"
import Counter from "./Counter.js"

const client = await L.Client()
const [contract, sender] = signer(2)

await L
  .tx(function*() {
    yield* L.id
      .from(new Uint8Array())
      .signer("contract")
      .deploy(new Counter(), {
        state: {
          count: L.u256.from(1),
        },
      })
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
