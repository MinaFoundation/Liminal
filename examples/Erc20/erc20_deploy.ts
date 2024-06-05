import * as L from "liminal"
import { signer } from "liminal/test"

// A Liminal-idiomatic implementation of ERC20
import * as Erc20 from "./Erc20.contract.ts"
// An optional extension of the ERC20 spec
import * as Erc20Metadata from "./extensions/Erc20Metadata.contract.ts"

const client = await L.client()
const [contract, sender] = signer(2)

await L
  .tx(function*() {
    yield* L.id
      .new(contract.publicKey)
      .signer("contract")
      .deploy({ ...Erc20, ...Erc20Metadata })
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
