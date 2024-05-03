import * as L from "liminal"
import * as spec from "./spec/mod.js"
import { TransferEvent, TransferProps } from "./spec/mod.js"

L.tx(function*() {
  this.sender
  const x = something(new L.u8(1))
})

const something = L.f(function*(hi: L.u8) {
  const x = Animal.from(new Human())
  const y = yield* x
    .match()
    .when("Another", function*(v) {
      yield "SomeError" as const
      return 4
    })
    .when(Cat, function*(v) {
      yield "sup" as const
      return 1
    })
    .when(Dog, function*(v) {
      yield "hi" as const
      return 2
    })
    .when(Human, function*(v) {
      yield "yo" as const
      return 3
    })
})

const tx = L.f(function*() {
  const [contract, from] = yield* L.signers("contract", "from")

  const deploy = new L.bool(true)
  const g = yield* deploy.ifElse(
    function*() {
      yield "hello" as const
      return 1
    },
    function*() {
      yield "Florian" as const
      return 1
    },
  )
  yield deploy.assert("yo")
  // yield* deploy.assertEquals(new L.bool(true), {})
  const to = new L.id(new Uint8Array())
  const randomError = new L.bool(false)

  yield* deploy.if(function*() {
    yield* contract.deploy(spec, true)
  })
  yield* randomError.if(function*() {
    yield TransferEvent.from("Initiated")
  })
  const assets = new L.id(new Uint8Array()).as(spec)
  const transferProps: TransferProps = {
    token: new L.u64(101),
    from,
    to,
    amount: new L.u64(1e9),
  }
  // yield new L.bool(true).not().assert("")
  yield* assets.transfer(transferProps)
  const prev = yield* assets.tokens.set(null!)
  const result = yield* assets.transfer(transferProps)
  yield TransferEvent.from("Result")
  return result
})

type Signer = (input: Uint8Array) => Uint8Array
declare const signerA: Signer
declare const signerB: Signer
declare const signerC: Signer

class Attempt extends L.vec(L.u8) {}
class VerifierDnMatchSpec extends L.struct({
  attempt: Attempt,
  target: L.vec(L.u8),
}) {}
class ContractError extends L.union(VerifierDnMatchSpec, "SomethingElse") {}

class Human extends L.tagged("human") {}
class Cat extends L.tagged("cat") {}
class Dog extends L.tagged("dog") {}

class RuleViolation<T> {}
class Animal extends L.union(Human, Cat, Dog, "Another") {}
