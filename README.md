# Liminal

A WIP specification and library for describing programs that blend zero knowledge and runtime
environments.

```ts
import * as L from "liminal"

// Declare a persistent state.
const count = new L.u64.state()

function increment() {
  // Lift a JavaScript value into Liminal.
  const one = L.u64.new(1)
  // Create a new value by adding the `one` to `count`.
  const next = count().add(one)
  // Set `count` to the new value.
  count(next)
}
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
