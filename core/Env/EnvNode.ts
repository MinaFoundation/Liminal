import { id, signer } from "../Id/Id.js"
import { ConstructorNode } from "../Node.js"

export class CallerNode extends ConstructorNode("callerId")<id> {
  constructor() {
    super(id)
  }
}

export const self = Symbol()
export class SelfNode extends ConstructorNode("Self")<signer<typeof self>> {
  constructor() {
    super(signer(self))
  }
}

export const sender = Symbol()
export class SenderNode extends ConstructorNode("Sender")<signer<typeof sender>> {
  constructor() {
    super(signer(sender))
  }
}
