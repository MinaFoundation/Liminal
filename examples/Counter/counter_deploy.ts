import * as L from "liminal"
import { signer } from "liminal/test"
import { Counter } from "./Counter.js"

const client = await L.Client()
const [contract, sender] = signer(2)

const deploy = L.id
  .fromBytes(contract.publicKey)
  .signer("contract")
  .deploy(new Counter(), {
    state: {
      count: L.u256.new(1),
    },
  })

await L
  .tx(deploy)
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
