# Liminal

A WIP concept DX for describing programs that blend zero knowledge and runtime environments.

```ts
import * as L from "liminal"

export class Counter {
  count = L.u256.state();

  *increment() {
    const from = yield* this.count()
    const to = from.add(L.u256.new(1))
    yield IncrementedEvent.new({ from, to })
    return yield* this.count(to)
  }
}

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  from: L.u256,
  to: L.u256,
}) {}
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
