import { MerkleList as MerkleListNative } from "../lib/mod.ts"
import { Effect } from "./Effect.ts"
import { u256 } from "./Int.ts"
import { ConstructorNode, TypeNode } from "./Node.ts"
import { Type } from "./Type.ts"

export interface MerkleList<T extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleList<T>>>
{}

export function MerkleList<T extends Type>(elementType: new() => T) {
  return class extends Type.make("MerkleList", { elementType })<
    MerkleListNative<Type.Native<T>>,
    undefined,
    never
  > {
    length: u256 = new MerkleListLength(this).instance()
    first = this.at(u256.new(1))
    last = this.at(this.length.subtract(u256.new(1)))

    prepend(value: T): MerkleList<T> {
      return new MerkleListPrepend(this, value).instance()
    }

    append(value: T): MerkleList<T> {
      return new MerkleListAppend(this, value).instance()
    }

    shift(): MerkleList<T> {
      return new MerkleListShift(this).instance()
    }

    pop(): MerkleList<T> {
      return new MerkleListPop(this).instance()
    }

    at(index: u256): T {
      return new MerkleListAt(this, index, elementType).instance()
    }

    reduceKeys<R extends Type, Y extends Type>(
      initial: R,
      f: (acc: R, cur: T) => Generator<Y, R>,
    ): Effect<R, Y> {
      throw 0
    }
  }
}

export class MerkleListLength extends ConstructorNode("MerkleListLength")<u256> {
  constructor(readonly list: MerkleList) {
    super(u256)
  }
}

export class MerkleListPrepend<T extends Type = any>
  extends TypeNode("MerkleListPrepend")<MerkleList<T>>
{
  constructor(list: MerkleList<T>, readonly element: T) {
    super(list)
  }
}

export class MerkleListAppend<T extends Type = any>
  extends TypeNode("MerkleListAppend")<MerkleList<T>>
{
  constructor(list: MerkleList<T>, readonly element: T) {
    super(list)
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
