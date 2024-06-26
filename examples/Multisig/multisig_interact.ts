import * as L from "liminal"
import { signer } from "liminal/test"
import * as Multisig from "./Multisig.contract.ts"

using client = await L.client()
const [sender, recipient, ...signatories] = signer(4)

const contract = L.id.fromHex(Deno.env.get("MULTISIG_ID")!).bind(Multisig)

class Proposal extends L.f({
  amount: L.u256,
  to: L.id,
}, function*({ amount, to }) {
  const signer = yield* contract.signer("Multisig")
  yield* signer.send(amount, to)
}) {}

const proposal = Proposal.new({
  amount: 1e9,
  to: recipient.publicKey,
})

const { result: multisigId } = await L
  .tx(function*() {
    const multisigId = yield* contract.Create
      .new({
        members: new Set(signatories.map((x) => x.publicKey)),
        threshold: 2,
      })
      .run()
    yield* contract.Fund.new({ multisigId, amount: 1e9 }).run()
    yield* contract.Propose.new({ multisigId, vk: proposal.vk }).run()
    return multisigId
  })
  .sign(sender, { funder: sender })
  .run()
  .commit(client)
  .finalized()

await L
  .tx(function*() {
    yield* contract.Approve
      .new({ multisigId, proposalId: proposal.vk })
      .sign("A")
      .run()
    yield* contract.Approve
      .new({ multisigId, proposalId: proposal.vk })
      .sign("B")
      .run()
    yield* proposal.authorize("Multisig", multisigId).run()
  })
  .sign(sender, { A: signatories[0], B: signatories[1] })
  .run()
  .commit(client)
  .finalized()
