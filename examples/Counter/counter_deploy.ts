import * as L from "liminal"
import { signer } from "liminal/test"
import * as Counter from "./Counter.contract.ts"

const client = await L.client()
const [contract, sender] = signer(2)

await L
  .tx(function*() {
    const deployer = yield* L.id.new(contract.publicKey).signer("contract")
    yield* deployer.deploy(Counter)
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
