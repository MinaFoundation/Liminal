# TODO

## Design thoughts

- Should be able to plainly see which keys correspond to required signatures, hence the difference
  between the id and signer type
- Complement the constructor factory inheritance pattern. Point to punchcard shapes. I first saw
  this pattern in … and believe it’s far underused. Sticking with that approach, although tweaking
  the representations of types in a number of ways.
- Standardize a constrained/sandboxable interface for L2s and wallets to implement against
- It’s clear to yield effects bc effects cannot be passed to builtins. If you do not yield an
  effect, you’ll get a compilation error.
- Just a description. Not the execution. We want to compile this into a minimal metadata format from
  which we can derive circuits.
- Doc comments flow through the experience
- State update preconditions are derived from assertions
- Generators are quite nice, as they establish a secondary channel (the yield channel). This enables
  type safe modeling of functional effects.
- Another benefit of this: one can describe signer requirements in such a way that they’re
  propagated through to callers. This means that you can utilize a contract that has unknown signer
  requirements, and get static type errors.
- Establish rules around conversions. To + from
- No `exhaustive` method because if you don’t match all variants – any place where you would use the
  partially-matched-on value will produce a type error if it hasn't been dealt with properly.
- Deploy method chaining off of signer
- Maybe describe why using generators is not a common path
- `signer` is assignable to `id`, but contains methods such as `deploy` and `send`.
- all values are immutable / all methods pure
- lots of methods in eth ecosystem interfaces return a boolean to indicate success. We don't need to
  do that, because we can observe events during the given execution locally
- the tx block can take in a generator function or a generator. This is really nice for developing
  pattern libraries that interact with the on-chain world.
- In T6's words: "the yield* indicates 'hey, an effect is being used here'"
- should `Struct` instead be `Event`? We'll never opt to use a `Struct` if we don't have to / would
  prefer TS interfaces / JS objects

———

- tsconfig paths mapping. Swc register does this, but esm sourcemapping is broken. Meanwhile
  ts-node's accompanying tsconfig-paths lib is incompatible with --import approach. Seemingly
  unmaintained.

- default values

- make everything `yield*`able

- merkle map/list equality checks, slicing

How do we deal with tipping within the tx generator? Ideally we could use different tips for
different calls, no?

Merkle list+map impls

Batch set

Can we do away with account updates?

Implicit type conversion in misc. methods. Ie.

Custom inspect

Fallible from? For instance a u16 to a u8, where there is a runtime check for overflowing

```ts
add(value: this | Type.From<this>): this {
  return new AddNode(this, value).instance()
}
```

<!--

Be consistent about convention around type names/tags/misc.

// trap
// deps
// sign
// event

-->

// if you don't yield, it's effectively meta-programming

Structure:

- why generators?
- ids and signers
