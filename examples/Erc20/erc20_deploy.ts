import * as L from "liminal"
import { signer } from "liminal/test"
import * as Erc20 from "./Erc20.js"
import * as Erc20Metadata from "./extensions/Metadata.js"

const client = await L.Client()
const [contract, sender] = signer(2)

await L
  .tx(
    L.id
      .from(contract.publicKey)
      .signer("contract")
      .deploy({ ...Erc20, ...Erc20Metadata }, {
        state: {
          // For ERC20
          totalSupply_: L.u256.from(1e9),
          balances_: new Erc20.Balances(),
          allowances_: new Erc20.Allowances(),
          // For the ERC20 metadata extension
          name_: L.String.from("Liminal Coin"),
          symbol_: L.String.from("LMN"),
          decimals_: L.u8.from(18),
        },
      }),
  )
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
