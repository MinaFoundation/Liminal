import { Contract } from "./Contract.js"
import { Effect } from "./Effect.js"
import { Namespace } from "./Namespace.js"
import { Type } from "./Type.js"

class Base<Signed extends boolean>
  extends Type<"id", Uint8Array, { signed: Signed }, never, never>
{
  constructor(signed: Signed) {
    super("id", { signed })
  }

  bind<N extends Namespace>(namespace: N) {
    return new BindEffect(this, namespace)
  }
}

export class BindEffect<N extends Namespace> extends Effect<"Bind", Contract<N>, never> {
  constructor(self: Base<boolean>, readonly namespace: N) {
    super("Bind", self)
  }
}

export class id extends Base<false> {
  constructor() {
    super(false)
  }

  // TODO: enable chaining into .deploy?
  signer<K extends string>(key: K) {
    return new SignerResult<K>(this, key)
  }
}

export class SignerResult<K extends string> extends Effect("signer")<SignerRequirement<K>, signer> {
  constructor(readonly self: id, readonly key: K) {
    super()
  }
}

export class signer extends Base<true> {
  constructor(readonly for_: id) {
    super(true)
  }

  deploy<N extends Namespace>(namespace: N) {
    return new DeployResult<N>(this, namespace)
  }
}

export class DeployResult<N extends Namespace> extends Effect("Deploy")<never, Contract<N>> {
  constructor(readonly self: signer, readonly namespace: N) {
    super()
  }
}

export class SignerRequirement<K extends string> {
  readonly tag = "SignerRequirement"
  constructor(readonly key: K) {}
}
