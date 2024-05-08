import { Contract } from "../Contract.js"
import { Effect } from "../Effect/Effect.js"
import { u64 } from "../Int/Int.js"
import { State } from "../State.js"
import { Type } from "../Type/Type.js"

export class id extends Type.make("id")<Uint8Array, never, never> {
  bind<N>(namespace: N): Generator<never, Contract<N>> {
    throw 0
  }

  signer<K extends string>(key: K): Effect<SignerRequirement<K>, signer<K>> {
    throw 0
  }
}

export class SignerRequirement<K extends string = any> {
  readonly tag = "SignerRequirement"
  constructor(readonly key: K) {}
}

export interface signer<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof signer<K>>>
{}

export function signer<K extends keyof any>(key: K) {
  return class extends id {
    readonly key = key

    deploy<N>(namespace: N, initialState: InferState<N>): Generator<never, Contract<N>> {
      throw 0
    }

    send(props: SendProps): Effect<never, never> {
      throw 0
    }
  }
}

// TODO: make this check better
export type InferState<N> = {
  [K in keyof N as N[K] extends State ? K : never]: N[K] extends State<infer T> ? T : never
}

export interface SendProps {
  to: id
  amount: u64
}
