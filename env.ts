import { source } from "Source.js"
import { id, signer } from "./id.js"

export class CallerNode extends source("callerId")<id> {}
export const caller = new CallerNode(new id()).value()

export class Self extends source("Self")<signer<typeof Self.key>> {
  static readonly key = Symbol()
}
export const self = new Self(new (signer(Self.key))()).value()
