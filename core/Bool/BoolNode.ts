import { ConstructorSource, TypeSource } from "../Source.js"
import { bool } from "./Bool.js"

export class True extends ConstructorSource("true")<bool> {
  constructor() {
    super(bool)
  }
}

export class False extends ConstructorSource("false")<bool> {
  constructor() {
    super(bool)
  }
}

export class Not extends TypeSource("not")<bool> {}
