import { Instance, Type } from "./Type.js"

class Id extends Instance<id> {
  signer = false
}

export interface id extends Type<"u256", number, {}, Id, never> {}
export const id: id = Type("u256", {}, Id)

class Signer extends Id {
  readonly signer = true
}

export interface signer extends Type<"u256", number, {}, Signer, id> {}
export const signer: signer = Type("u256", {}, Signer)
