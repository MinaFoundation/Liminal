import { Contract, Spec } from "./Contract.js"
import { enum_ } from "./enum.js"
import { Type } from "./type.js"

export enum IdFlags {
  Default = 0,
  Signer = 1,
}

export class id extends Type("id", { flags: IdFlags.Default })<Uint8Array> {
  bind: <S extends Spec>(spec: S) => Contract<S>
  deploy: <S extends Spec>(
    spec: S,
    override: boolean,
  ) => Generator<DeployError, Contract<S>>
}

export class signer extends id {
  static readonly signer = true
}

class DeployError extends enum_({
  A: null!,
  B: null!,
  C: null!,
}) {}
