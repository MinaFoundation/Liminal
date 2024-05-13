import { id, signer } from "./Id.ts"
import { ConstructorNode } from "./Node.ts"

export namespace EnvNode {
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

  export class NullIdNode extends ConstructorNode("NullId")<id> {
    constructor() {
      super(id)
    }
  }
}

export const nullId = new EnvNode.NullIdNode().instance()

export const caller = new EnvNode.CallerNode().instance()

export const self = new EnvNode.SelfNode().instance()

export const sender = new EnvNode.SenderNode().instance()
