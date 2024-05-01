import { id } from "./id.js"
import { Any, Type, TypeNative } from "./type.js"

export interface Globals {
  sender: Sender
}

// TODO: this needs to return the actual `T`, not a wrapper
function global<K extends keyof any, T extends Any>(tag: K, type: T) {
  return class extends Type("BuiltIn", { tag, type })<TypeNative<T>> {
    constructor() {
      super(null!)
    }
  }
}

export class Sender extends global("sender", id) {}
export const sender = new Sender()

// TODO: do we have access to the current contract ID?
// export class Contract extends global("contract", id) {}
// export const contract = new Contract()
