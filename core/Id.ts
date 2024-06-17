import { Store } from "../client/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { Value } from "./Value.ts"

export type IdSource = IdSource.Sender | IdSource.Self | IdSource.Caller | IdSource.Null
export namespace IdSource {
  export class Hex extends Tagged("Hex") {}
  export class Bytes extends Tagged("Bytes") {}
  export class Sender extends Tagged("Sender") {}
  export class Self extends Tagged("Self") {}
  export class Caller extends Tagged("Caller") {}
  export class Null extends Tagged("Null") {}
}

export class id extends Value.make("id")<IdSource, Uint8Array, Uint8Array> {
  static fromHex(_hex: string): id {
    unimplemented()
  }

  balance = new u256(new U256Source.Balance(this))

  bind<N>(_namespace: N): Contract<N> {
    unimplemented()
  }

  signer<K extends string>(_key: K): SignerEffect<K> {
    unimplemented()
  }
}

export class SignerEffect<K extends string> extends Effect<SignerRequirement<K>, signer<K>> {
  constructor(readonly key: K) {
    super()
  }

  deploy<N>(
    _namespace: N,
    _deployOptions?: DeployOptions,
  ): Generator<SignerRequirement<K>, Contract<N>> {
    unimplemented()
  }
}

export class SignerRequirement<K extends string = any>
  extends Value.make("SignerRequirement")<K, never>
{
  constructor(readonly key: K) {
    super(key)
  }
}

export interface signer<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof signer<K>>>
{}

export function signer<K extends keyof any>(key: K) {
  return class extends id {
    readonly key = key

    deploy<N>(_namespace: N, _deployOptions?: DeployOptions): Generator<never, Contract<N>> {
      unimplemented()
    }

    send(_props: SendProps): Effect<never, never> {
      unimplemented()
    }
  }
}

export const nullId = new id(new IdSource.Null())
export const caller = new id(new IdSource.Caller())
export const self = new id(new IdSource.Self())
export const sender = new id(new IdSource.Sender())

export interface DeployOptions {
  deployer?: signer
}

export interface SendProps {
  to: id
  amount: u256
}

export type Contract<N> =
  & id
  & { da(_store: Store): void }
  & { [K in keyof N]: N[K] }

export function Contract<N>(id: id, ns: N): Contract<N> {
  return Object.assign(id, ns, {
    da(_store: Store) {
      return Contract(id, ns)
    },
  })
}
