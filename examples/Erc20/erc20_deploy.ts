import * as L from "liminal"
import { signer } from "liminal/test"
import { Allowances, Balances, Erc20 } from "./Erc20.js"

const client = await L.Client()
const [contract, sender] = signer(2)

await L
  .tx(function*() {
    yield* L.id
      .from(contract.publicKey)
      .signer("contract")
      .deploy(new Erc20(), {
        state: {
          totalSupply_: L.u256.from(1e9),
          balances_: new Balances(),
          allowances_: new Allowances(),
          name_: L.String.from("Liminal Coin"),
          symbol_: L.String.from("LMN"),
        },
      })
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
