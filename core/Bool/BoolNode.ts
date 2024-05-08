import { ConstructorNode, TypeNode } from "../Node.js"
import { bool } from "./Bool.js"

export class True extends ConstructorNode("true")<bool> {
  constructor() {
    super(bool)
  }
}

export class False extends ConstructorNode("false")<bool> {
  constructor() {
    super(bool)
  }
}

export class Not extends TypeNode("not")<bool> {}
