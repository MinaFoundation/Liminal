import { u256 } from "../Int/Int.js"
import { ConstructorNode, TypeNode } from "../Node.js"
import { Type } from "../Type/Type.js"
import { MerkleList } from "./MerkleList.js"

export class MerkleListLength extends ConstructorNode("MerkleListLength")<u256> {
  constructor(readonly list: MerkleList) {
    super(u256)
  }
}

export class MerkleListPrepend<T extends Type = any>
  extends TypeNode("MerkleListPrepend")<MerkleList<T>>
{
  constructor(target: MerkleList<T>, readonly value: T) {
    super(target)
  }
}

export class MerkleListAppend<T extends Type = any>
  extends TypeNode("MerkleListAppend")<MerkleList<T>>
{
  constructor(target: MerkleList<T>, readonly value: T) {
    super(target)
  }
}

export class MerkleListShift<T extends Type = any>
  extends TypeNode("MerkleListShift")<MerkleList<T>>
{}

export class MerkleListPop<T extends Type = any> extends TypeNode("MerkleListPop")<MerkleList<T>> {}

export class MerkleListAt<T extends Type = any> extends ConstructorNode("MerkleListAt")<T> {
  constructor(readonly list: MerkleList, readonly index: u256, type: new() => T) {
    super(type)
  }
}
