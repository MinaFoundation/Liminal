import * as L from "liminal"
import { signer } from "liminal/test"
import * as NFT from "./NFT.contract.ts"

const client = await L.client()

const [senderSigner, contractSigner] = signer(2)

const contractId = L.id.fromHex(Deno.env.get("CONTRACT_ID")!)

await L
  .tx(function*() {
    const contract = yield* contractId.signer("contract").deploy(NFT)
    const tokenId = yield* contract.create({
      metadata: NFT.Token.new(new Uint8Array()),
    })
    yield* contract.transfer({ tokenId, to: L.nullId })
  })
  .sign(senderSigner, { contract: contractSigner })
  .run()
  .commit(client)
  .finalized()
