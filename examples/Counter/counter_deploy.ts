import * as L from "liminal"
import { signer } from "liminal/test"
import * as Counter from "./Counter.contract.ts"

const client = await L.client()
const [contract, sender] = signer(2)

await L
  .tx(
    L.id
      .new(contract.publicKey)
      .signer("contract")
      .deploy(Counter),
  )
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
