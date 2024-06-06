# Liminal

Liminal is a WIP TypeScript library for authoring and interacting with programs that integrate with
zero-knowledge proofs (and more specifically, [Mina](https://minaprotocol.com/)). Liminal is
currently a type-only mock of what we may ultimately want to implement. It still needs much
feedback, including that from key stakeholders, such as [o1labs](https://www.o1labs.org/). In the
long term, Liminal may serve as a specification of capabilities supported in a given Mina program.
In this case, the Liminal AST would be a common representation against which builders could support
a wide range of targets, such as block explorers, wallet transaction insights, persistent storage
layers and even non-JS Liminal runtimes.

## 1. Author a Contract

`Counter.contract.ts`

```ts
import * as L from "liminal"

// Define a persistent state with an initial value of `0`.
export const count = L.u256.new(0);

// Define a method.
const increment = L.f({ amount: L.u256 }, function*({ amount }) {
  // Calculate the final count.
  const final = count.add(amount))
  // Set the count to `final`.
  yield* count.assign(to)
  // "Emit" the `IncrementedEvent`
  yield IncrementedEvent.new({ initial: count, final })
})

// Define the event Struct for use in the method above.
export class IncrementedEvent extends L.Struct({
  // Struct fields can be defined with `keyof any`...
  tag: "Incremented",
  // ... or with Liminal `Type` constructors.
  initial: L.u256,
  final: L.u256,
}) {}
```

## 2. Deploy the Contract

`deploy.ts`

```ts
import * as L from "liminal"
import * as Counter from "./Counter.contract.ts"

// Create a transaction to deploy the contract.
await L
  .tx(function*() {
    // Reference the contract id (public key). Here we pretend `CONTRACT_ID` is in scope.
    const contractId = yield* L.id.fromHex(CONTRACT_ID)
    // This forces us to specify a signer for "contract" later.
    const contractSigner = yield* contractId.signer("contract")
    // Use the new signer to deploy the `Counter`.
    yield* contract.deploy(Counter)
  })
  .sign(senderSigner, { contract: contractSigner })
  .run()
  // Specify the client with which to commit the proof.
  .commit(client)
  // Get a promise that resolves upon block finalization.
  .finalized()
```

## 3. Interact With the Contract

`interact.ts`

```ts
import * as L from "liminal"

// Get bindings to the deployed `Counter` contract.
// Note, we also specify the store with which to access off-chain data.
const counter = L.id
  .fromHex(CONTRACT_ID)
  .bind(Counter)
  .store(DaLayer)

// Create a transaction to increment the counter.
const finalized = await L
  .tx(function*() {
    // Call the counter's increment method.
    yield* counter.increment()
    // Return the new count.
    return counter.count
  })
  .sign(senderSigner)
  .run((event) => {
    // The emitted Liminal `Struct`s get translated into their JS counterparts.
    if (event.tag === "Incremented") {
      event.initial satisfies number
      event.final satisfies number
    }
  })
  .commit(client)
  .finalized()

// Get the finalized block hash and the returned count, translated to a JS number.
const { block, result } = finalized
result satisfies number

// Fetch the count from the off-chain store.
const count = await counter.count.fetch()

// (Optional) Supply the Mina client to ensure fetched data is proven.
const count = await counter.count.fetch(client)
```

<!--

## Code of Conduct

Everyone interacting in this repo is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

## Contributing

Contributions are welcome and appreciated! Check out the [contributing guide](CONTRIBUTING.md)
before you dive in.

-->

## License

Liminal is [Apache licensed](LICENSE).
