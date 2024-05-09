import { ConstructorNode } from "../Node.js"
import { id } from "./Id.js"

export class NullIdNode extends ConstructorNode("NullId")<id> {
  constructor() {
    super(id)
  }
}
