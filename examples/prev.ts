export {}

// import * as L from "liminal"
// import * as spec from "./spec/mod.js"
// import { TransferProps } from "./spec/mod.js"

// function* tx({ from, contract: contractId }: {
//   from: L.signer<"from">
//   contract: L.signer<"contract">
// }) {
//   const deploy = L.bool.from(true)
//   const g = yield* deploy
//     .if(function*() {
//       yield "hello" as const
//       return 1
//     })
//     .else(function*() {
//       yield "Florian" as const
//       return 2
//     })
//   // yield* deploy.assertEquals(new L.bool(true), {})
//   const to = L.id.from(new Uint8Array())
//   const randomError = L.bool.from(false)

//   yield* deploy.if(function*() {
//     yield* contractId.deploy(spec)
//   })
//   const assets = yield* contractId.bind(spec)
//   yield* randomError.if(function*() {
//     yield "Initiated" as const
//   })
//   const transferProps: TransferProps = {
//     token: L.u64.from(101),
//     from,
//     to,
//     amount: L.u64.from(1e9),
//   }
//   // yield new L.bool(true).not().assert("")
//   yield* assets.transfer(transferProps)
//   const prev = yield* assets.tokens.set(null!, null!)
//   const result = yield* assets.transfer(transferProps)
//   yield "Result" as const
//   return result
// }

// import runtime from "liminal_runtime"
// import * as L from "liminal"

// using mina = L.liminal(["A", "B", "C"])
// using l2 = mina.l2(["A", "B", "C"])

// const result = await tx
//   .({
//     deploy: true,
//     contract: new Uint8Array(),
//     from: new Uint8Array(),
//     to: new Uint8Array(),
//     randomError: false,
//   })
//   .opts({ tip: 1e9 })
//   .sign({
//     sender: signerA,
//     contract: signerB,
//     from: signerC,
//   })
//   .run(runtime)
//   .commit(l2)
//   .status()

// await commit.serve()

// // .serveCommits() / effectively turn this into a web server or archive node
