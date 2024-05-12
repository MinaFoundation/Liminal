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
- Difference between how you can use different definitions depending on the environment in which
  you’re using it. Hence the `this` reference within tx and contract code (which are effectively the
  same env).
- Types must be defined ahead of time for now. This will simplify implementation of a migrations DX.
- Just a description. Not the execution. We want to compile this into a minimal metadata format from
  which we can derive circuits. I believe we’ll want to create a registry for this.
- We need access to sender in the context of a transaction
- Benefit of generators is two-fold: 1. Functional effects. 2. this/context
- Doc comments flow through the experience
- Use `set` but ultimately derive a “reducer”, which can be used to preserve commutativity in most
  cases
- State update preconditions are derived from assertions
- Generators are quite nice, as they establish a secondary channel (the yield channel). This enables
  type safe modeling of functional effects.
- Another benefit of this: one can describe signer requirements in such a way that they’re
  propagated through to callers. This means that you can utilize a contract that has unknown signer
  requirements, and get static type errors.
- Establish rules around conversions. To + from
- No `exhaustive` method because if you don’t match all variants, you’ll get an Option instead of
  the given value, so any place where you would use that value will produce a type error anyways.
- Deploy method chaining off of signer
- Inside of a tx, we have different context from inside of a contract method.
- Generators are a risk
- `signer` is assignable to `id`, but contains methods such as `deploy` and `send`.
- default values
- all values are immutable / all methods pure
- lots of methods in eth ecosystem interfaces return a boolean to indicate success. We don't need to
  do that, because we can observe events during the given execution locally
- the `clone` method makes it clear that you're not operating on the original value. Your business
  logic is pure.

———

- yield vs. yield*

- merkle map/list equality checks, slicing

How do we deal with tipping within the tx generator? Ideally we could use different tips for
different calls, no?

Merkle list+map impls

Can we do away with account updates?

Implicit type conversion in misc. methods. Ie.

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
