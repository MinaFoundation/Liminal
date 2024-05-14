import * as L from "liminal"
import { signer } from "liminal/test"

// A Liminal-idiomatic implementation of ERC20
import * as Erc20 from "./Erc20.contract.ts"
// An optional extension of the ERC20 spec
import * as Erc20Metadata from "./extensions/Erc20Metadata.contract.ts"

const client = await L.Client()
const [contract, sender] = signer(2)

await L
  .tx(function*() {
    const totalSupply_ = L.u256.new(1e9)
    yield* L.id
      .new(contract.publicKey)
      .signer("contract")
      .deploy({ ...Erc20, ...Erc20Metadata }, {
        state: {
          // For ERC20
          totalSupply_,
          balances_: Erc20.Balances.new().set(L.sender, totalSupply_),
          allowances_: Erc20.Allowances.new(),
          // For the ERC20 metadata extension
          name_: L.String.new("Liminal Coin"),
          symbol_: L.String.new("LMN"),
          decimals_: L.u8.new(18),
        },
      })
  })
  .sign(sender, { contract })
  .run()
  .commit(client)
  .finalized()
