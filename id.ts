import { Contract } from "./Contract.js"
import { Effect } from "./Effect.js"
import { Namespace } from "./Namespace.js"
import { Type } from "./Type.js"

export class id extends Type<"id", Uint8Array, never, never, never> {
  constructor() {
    super("id")
  }

  bind<N extends Namespace>(namespace: N) {
    return new Bind(this, namespace)
  }

  signer<K extends string>(key: K): Signer<K> {
    return new Signer(this, key)
  }
}

export interface signer<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof signer<K>>>
{}
export function signer<K extends keyof any>(key: K) {
  return class extends id {
    readonly key = key

    deploy<N extends Namespace>(namespace: N): Deploy<N> {
      return new Deploy(this, namespace)
    }
  }
}

export class Bind<N extends Namespace> extends Effect("Bind")<Contract<N>, never> {
  constructor(readonly self: id, readonly namespace: N) {
    super()
  }
}

export class Signer<K extends string> extends Effect("signer")<SignerRequirement<K>, signer<K>> {
  constructor(readonly self: id, readonly key: K) {
    super()
  }
}

export class SignerRequirement<K extends string> {
  readonly tag = "SignerRequirement"
  constructor(readonly key: K) {}
}

export class Deploy<N extends Namespace> extends Effect("Deploy")<never, Contract<N>> {
  constructor(readonly self: signer, readonly namespace: N) {
    super()
  }
}
