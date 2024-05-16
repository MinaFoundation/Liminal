# Liminal

A WIP concept DX for describing programs that blend zero knowledge with JavaScript runtimes.

```ts
import * as L from "liminal"

export class Counter {
  // Define a persistent state.
  count = L.u256.state();

  // Define a method.
  *increment() {
    // Get the initial count.
    const initial = yield* this.count()
    // Get the increment `amount` (also describes the dependency).
    const { amount } = yield* L.use({ amount: L.u256 })
    // Calculate the final count.
    const final = count.add(amount))
    // Set the count to `final`.
    yield* this.count(to)
    // "Emit" the `IncrementedEvent`
    yield IncrementedEvent.new({ initial, final })
  }
}

// Define the event Struct for use in the above method.
export class IncrementedEvent extends L.Struct({
  // Struct fields can be defined with `keyof any`...
  tag: "Incremented",
  // ... or with Liminal `Type` constructors.
  initial: L.u256,
  final: L.u256,
}) {}

// Create a transaction to deploy the contract.
await L
  .tx(function*() {
    // Reference the contract id (public key).
    // Here we read it from Node.js environment variable.
    const contractId = yield* L.id.fromHex(process.env.CONTRACT_ID)
    // This forces us to specify a signer for "contract" later.
    const contractSigner = yield* contractId.signer("contract")
    // Use the new signer to deploy the `Counter`.
    yield* contract.deploy(new Counter(), {
      // Specify the initial state.
      state: { count: L.u256.new(0), },
    })
  })
  .sign(senderSigner, { contract: contractSigner })
  .run()
  // Specify the client with which to commit the proof.
  .commit(client)
  // Get a promise that resolves upon block finalization.
  .finalized()

// Get bindings to the deployed `Counter` contract.
// Note, we also specify the store with which to access off-chain data.
const counter = L.id
  .fromHex(process.env.CONTRACT_ID)
  .bind(new Counter())
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
