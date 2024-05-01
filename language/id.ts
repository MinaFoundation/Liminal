import { Contract, Spec } from "./Contract.js"
import { enum_ } from "./enum.js"
import { Type } from "./type.js"

export class id extends Type("id", {})<Uint8Array> {
  static signer = false

  as: <S extends Spec>(spec: S) => Contract<S>

  deploy: <S extends Spec>(
    spec: S,
    override: boolean,
  ) => Generator<DeployError, Contract<S>>
}

export class signer extends id {
  static override readonly signer = true
}

class DeployError extends enum_({
  A: null!,
  B: null!,
  C: null!,
}) {}
