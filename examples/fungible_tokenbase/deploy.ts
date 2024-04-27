import { event, liminal, T } from "liminal"
import impl from "./impl.js"
import { CreateError } from "./spec/mod.js"

using mina = await liminal(["", "", ""])
using l2 = await mina.l2(["", "", ""])

const tx = l2.tx(function*() {
  const contract = impl.deploy({ deployer })
  yield event({
    type: "ContractCreated",
    contract,
  })
  yield T
    .bool(true)
    .not()
    .assert(CreateError.A)
  yield contract.setMetadata({
    metadata: new Uint8Array(),
  })
})

await tx
  .sign({ [deployer]: process.env.DEPLOYER })
  .run({ handler })
  .commit({ tip: 1e9 })
  .status()

function handler(value: typeof tx["event"]) {
  console.log(value)
}

//

declare const deployer: any
