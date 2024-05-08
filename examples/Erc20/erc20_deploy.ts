import * as L from "liminal"
import { TestSigner } from "liminal/test"
import { Allowances, Balances, Erc20 } from "./Erc20.js"

const client = await L.Client()
const contract = TestSigner()
const sender = TestSigner()

await L
  .tx(function*() {
    yield* L.id
      .from(contract.publicKey)
      .signer("contract")
      .deploy(new Erc20(), {
        deployer: L.sender,
        state: {
          totalSupply_: L.u256.from(1e9),
          balances_: new Balances(),
          allowances_: new Allowances(),
        },
      })
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
