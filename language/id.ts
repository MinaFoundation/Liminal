import { Contract, Spec } from "./Contract.js"
import { Type } from "./type.js"
import { union } from "./union.js"

export class id extends Type("id", { signer: true })<Uint8Array> {
  as: <S extends Spec>(spec: S) => Contract<S>

  deploy: <S extends Spec>(
    spec: S,
    override: boolean,
  ) => Generator<DeployError, Contract<S>>
}

export class signer extends id {
  static {
    this[""].metadata.signer = true
  }
}

class DeployError extends union("A", "B", "C") {}

export class Signers<N extends string[]> {
  constructor(readonly names: N) {}
}
export declare function signers<N extends string[]>(
  ...names: N
): Generator<Signers<N>, { [K in keyof N]: signer }>
