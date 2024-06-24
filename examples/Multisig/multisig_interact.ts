import * as L from "liminal"
import { signer } from "liminal/test"
import * as Multisig from "./Multisig.contract.ts"

using client = await L.client()
const [sender, recipient, ...signatories] = signer(4)

const contract = L.id.fromHex(Deno.env.get("MULTISIG_ID")!).bind(Multisig)

class Proposal extends L.effect({
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

const { result: { id } } = await L
  .tx(function*() {
    const multisig = yield* contract.Create
      .new({
        members: new Set(signatories.map((x) => x.publicKey)),
        threshold: 2,
      })
      .run()
    yield* contract.Fund
      .new({
        amount: 1e9,
        multisigId: multisig.fields.id,
      })
      .run()
    yield* contract.Propose
      .new({
        multisigId: multisig.fields.id,
        vk: proposal.vk,
      })
      .run()
    return multisig
  })
  .sign(sender)
  .run()
  .commit(client)
  .finalized()

// declare const f: L.FCtor<L.SignerRequirement<"multisig">, void, {}>
// function* x() {
//   const multisig = yield* multisigs.get(null!)["?"](L.None)
//   yield* f.permit(multisig.fields.account).run()
// }
