import { id, signer } from "../Id/Id.js"
import { ConstructorSource, StaticConstructorSource } from "../Source.js"

export class CallerNode extends StaticConstructorSource("callerId", id) {}

export const self = Symbol()
export class SelfSource extends ConstructorSource("Self")<signer<typeof self>> {
  constructor() {
    super(signer(self))
  }
}

export const sender = Symbol()
export class SenderSource extends ConstructorSource("Sender")<signer<typeof sender>> {
  constructor() {
    super(signer(sender))
  }
}
