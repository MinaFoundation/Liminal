import { u64 } from "int.js"
import { Contract } from "./Contract.js"
import { Effect } from "./Effect.js"
import { Namespace } from "./Namespace.js"
import { Type, type } from "./Type.js"

export class id extends type("id")<Uint8Array, never, never> {
  bind<N extends Namespace>(namespace: N): Bind<N> {
    return new Bind(this, namespace)
  }

  signer<K extends string>(key: K): Signer<K> {
    return new Signer(this, key)
  }
}

export class Bind<N extends Namespace> extends Effect("Bind")<never, Contract<N>> {
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

export interface signer<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof signer<K>>>
{}

export function signer<K extends keyof any>(key: K) {
  return class extends id {
    readonly key = key

    deploy<N extends Namespace>(namespace: N): Deploy<N> {
      return new Deploy(this, namespace)
    }

    send(props: SendProps): Send {
      return new Send(props)
    }
  }
}

export class Deploy<N extends Namespace> extends Effect("Deploy")<never, Contract<N>> {
  constructor(readonly self: signer, readonly namespace: N) {
    super()
  }
}

export class Send extends Effect("Send")<never, never> {
  constructor(readonly props: SendProps) {
    super()
  }
}

export interface SendProps {
  to: id
  amount: u64
}
