import { u256 } from "../Int/Int.js"
import { ConstructorSource, TypeSource } from "../Source.js"
import { Constructor, Type } from "../Type/Type.js"
import { MerkleList } from "./MerkleList.js"

export class MerkleListLength extends ConstructorSource("MerkleListLength")<u256> {
  constructor(readonly list: MerkleList) {
    super(u256)
  }
}

export class MerkleListPrepend<T extends Type = any>
  extends TypeSource("MerkleListPrepend")<MerkleList<T>>
{
  constructor(target: MerkleList<T>, readonly value: T) {
    super(target)
  }
}

export class MerkleListAppend<T extends Type = any>
  extends TypeSource("MerkleListAppend")<MerkleList<T>>
{
  constructor(target: MerkleList<T>, readonly value: T) {
    super(target)
  }
}

export class MerkleListShift<T extends Type = any>
  extends TypeSource("MerkleListShift")<MerkleList<T>>
{}

export class MerkleListPop<T extends Type = any>
  extends TypeSource("MerkleListPop")<MerkleList<T>>
{}

export class MerkleListAt<T extends Type = any> extends ConstructorSource("MerkleListAt")<T> {
  constructor(readonly list: MerkleList, readonly index: u256, type: Constructor<T>) {
    super(type)
  }
}
