import * as L from "liminal"
import { signer } from "liminal/test"
import * as NFT from "./NFT.contract.ts"

const client = await L.client()

const [senderSigner, contractSigner] = signer(2)

const contractId = L.id.fromHex(Deno.env.get("CONTRACT_ID")!)

await L
  .tx(function*() {
    const deployer = yield* contractId.signer("contract")
    const contract = yield* deployer.deploy(NFT)
    const tokenId = yield* contract.Create.new({ metadata: new Uint8Array() }).run()
    yield* contract.Transfer.new({ tokenId, to: L.nullId }).run()
  })
  .sign(senderSigner, { contract: contractSigner })
  .run()
  .commit(client)
  .finalized()
