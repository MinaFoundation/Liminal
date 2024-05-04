import { Contract } from "./Contract.js"
import { Namespace } from "./Namespace.js"
import { Type } from "./Type.js"

class Base<S extends boolean> extends Type<"id", Uint8Array, { signed: S }, never, never> {
  constructor(signed: S) {
    super("id", { signed })
  }

  declare bind: <N extends Namespace>(namespace: N) => Contract<N>
}

export class id extends Base<false> {
  constructor() {
    super(false)
  }

  // TODO: enable chaining into .deploy
  *signer<K extends string>(key: K): Generator<SignerRequirement<K>, signer> {
    yield new SignerRequirement(key)
    return new signer(this)
  }
}

export class signer extends Base<true> {
  constructor(readonly for_: id) {
    super(true)
  }

  declare deploy: <N extends Namespace>(namespace: N) => Contract<N>
}

export class SignerRequirement<K extends string> {
  readonly tag = "SignerRequirement"
  constructor(readonly key: K) {}
}
