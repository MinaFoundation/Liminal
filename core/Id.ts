import { Tagged } from "../util/Tagged.ts"
import { Effect } from "./Effect.ts"
import { u64 } from "./Int.ts"
import { State } from "./State.ts"
import { Type } from "./Type.ts"

export type IdSource = IdSource.Sender | IdSource.Self | IdSource.Caller | IdSource.Null
export namespace IdSource {
  export class Hex extends Tagged("Hex") {}
  export class Bytes extends Tagged("Bytes") {}
  export class Sender extends Tagged("Sender") {}
  export class Self extends Tagged("Self") {}
  export class Caller extends Tagged("Caller") {}
  export class Null extends Tagged("Null") {}
}

export class id extends Type.make("id")<IdSource, Uint8Array, Uint8Array> {
  static fromHex(hex: string): id {
    throw 0
  }

  static fromBytes(bytes: Uint8Array): id {
    throw 0
  }

  bind<N>(namespace: N): Contract<N> {
    throw 0
  }

  signer<K extends string>(key: K): SignerEffect<K> {
    throw 0
  }
}

export class SignerEffect<K extends string> extends Effect<SignerRequirement<K>, signer<K>> {
  deploy<N>(
    namespace: N,
    deployOptions: DeployOptions<N>,
  ): Generator<SignerRequirement<K>, Contract<N>> {
    throw 0
  }
}

export class SignerRequirement<K extends string = any>
  extends Type.make("SignerRequirement")<{ key: K }, never>
{
  constructor(readonly key: K) {
    super({ key })
  }
}

export interface signer<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof signer<K>>>
{}

export function signer<K extends keyof any>(key: K) {
  return class extends id {
    readonly key = key

    deploy<N>(namespace: N, deployOptions: DeployOptions<N>): Generator<never, Contract<N>> {
      throw 0
    }

    send(props: SendProps): Effect<never, never> {
      throw 0
    }
  }
}

export const nullId = new id(new IdSource.Null())
export const caller = new id(new IdSource.Caller())
export const self = new id(new IdSource.Self())
export const sender = new id(new IdSource.Sender())

export interface DeployOptions<N> {
  deployer?: signer
  state: DeployState<N>
}

export type DeployState<N> = {
  [K in keyof N as N[K] extends State ? K : never]: N[K] extends State<infer T> ? T : never
}

export interface SendProps {
  to: id
  amount: u64
}

// TODO
export type Contract<T> = id & T
