import * as L from "liminal"
import * as spec from "./spec/mod.js"
import { TransferEvent, TransferProps } from "./spec/mod.js"

const tx = L.f(function*() {
  const [contract, from] = yield* L.signers("contract", "from")

  const deploy = new L.bool(true)
  const to = new L.id(new Uint8Array())
  const randomError = new L.bool(false)

  yield* deploy.if(function*() {
    yield* contract.deploy(spec, true)
  })
  yield* randomError.if(function*() {
    yield TransferEvent.from("Initiated")
  })
  const tokenbase = new L.id(new Uint8Array()).as(spec)
  const transferProps: TransferProps = {
    token: new L.u64(101),
    from,
    to,
    amount: new L.u64(1e9),
  }
  // yield new L.bool(true).not().assert("")
  tokenbase.Transfer(transferProps)
  tokenbase.Accounts
  const result = yield* tokenbase.Transfer(transferProps)
  yield TransferEvent.from("Result")
  return result
})

type Signer = (input: Uint8Array) => Uint8Array
declare const signerA: Signer
declare const signerB: Signer
declare const signerC: Signer

class VerifierDnMatchSpec extends L.struct({
  attempt: L.vec(L.u8),
  target: L.vec(L.u8),
}) {}
class ContractError extends L.union(VerifierDnMatchSpec, "SomethingElse") {}

class Human {
  readonly tag = "human"
}
class Cat {
  readonly tag = "cat"
}
class Dog {
  readonly tag = "dog"
}

class RuleViolation<T> {}
