import { Contract } from "./Contract.js"
import { Namespace } from "./Namespace.js"
import { Type } from "./Type.js"

class Base<Signed extends boolean>
  extends Type<"id", Uint8Array, { signed: Signed }, never, never>
{
  constructor(signed: Signed) {
    super("id", { signed })
  }

  declare bind: <N extends Namespace>(namespace: N) => Contract<N>
}

export class id extends Base<false> {
  constructor() {
    super(false)
  }

  // TODO: enable chaining into .deploy
  declare signer: <K extends string>(key: K) => SignerResult<K>
}

export interface SignerResult<K extends string> extends Generator<SignerRequirement<K>, signer> {
  deploy: <N extends Namespace>(namespace: N) => Generator<SignerRequirement<K>, Contract<N>>
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
