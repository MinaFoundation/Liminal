import { bool, env, event, liminal, load, sender, T } from "liminal"
import * as spec from "./spec/mod.js"

using mina = liminal(["", "", ""])
using l2 = await mina.l2()

const tx = l2.tx(function*() {
  yield bool(true).assert(
    new SomeError({
      type: "TheError",
    }),
  )
  const contract = load(spec, env("first", T.pk))
  yield event({
    type: "log",
    value: new Uint8Array(),
  })
  yield event({
    type: "log",
    value: env("value", T.u8a),
  })
  yield contract.create({
    id: 1,
    supply: 2,
    decimals: 8,
    metadata: new Uint8Array(),
    admin: sender,
  })
})

await tx
  .sign({
    [sender]: process.env.ADMIN,
  })
  .run({
    handler,
    first: process.env.FIRST,
    value: "Hello!",
  })
  .commit({ tip: 1e9 })
  .status()

function handler(event: typeof tx["event"]) {
  console.log(event)
}

// .condition((_) => _.nonce(_ => _.validForNext(20)))
