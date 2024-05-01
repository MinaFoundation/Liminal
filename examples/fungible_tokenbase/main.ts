import * as L from "liminal"
import runtime from "liminal_runtime"
import * as spec from "./spec/mod.js"
import { TransferError, TransferEvent, TransferProps } from "./spec/mod.js"

class TxProps extends L.struct({
  deploy: L.bool,
  contract: L.id.signed(),
  from: L.id.signed(),
  to: L.id,
  randomError: L.bool,
}) {}

L.unhandle(effect, TransferEvent, {})

const tx = L.tx(TxProps, function*(props) {
  const { deploy, contract, from, to, randomError } = props.de()
  this.sender
  yield* deploy.if(function*() {
    yield contract.deploy(spec)
  })
  yield* randomError.if(function*() {
    yield TransferEvent.from(
      "Error",
      TransferError.from("AnotherProblem"),
    )
  })
  const tokenbase = new L.id(new Uint8Array()).bind(spec)
  const props = new TransferProps({
    token: 101,
    from,
    to,
    amount: 1e9,
  })
  yield new L.bool(true).not().assert("")
  yield TransferEvent.from("Initiated", props)
  const result = yield* tokenbase.Transfer(props)
  yield TransferEvent.from("Result", result)
  return result
})

using mina = L.liminal(["A", "B", "C"])
using l2 = mina.l2(["A", "B", "C"])

const result = await tx
  .apply({
    deploy: true,
    contract: new Uint8Array(),
    from: new Uint8Array(),
    to: new Uint8Array(),
    randomError: false,
  })
  .opts({ tip: 1e9 })
  .sign({
    sender: signerA,
    contract: signerB,
    from: signerC,
  })
  .run(runtime)
  .commit(l2)
  .status()

// await commit.serve()

// .serveCommits() / effectively turn this into a web server or archive node

type Signer = (input: Uint8Array) => Uint8Array
declare const signerA: Signer
declare const signerB: Signer
declare const signerC: Signer
