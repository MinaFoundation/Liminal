import { u256 } from "./int.js"
import { source } from "./Source.js"
import { Type, type } from "./Type.js"

export class MerkleListLength extends source("MerkleListLength")<u256> {}
export class MerkleListPrepend<T extends Type>
  extends source("MerkleListPrepend")<MerkleList<T>, Type>
{}
export class MerkleListAppend<T extends Type>
  extends source("MerkleListAppend")<MerkleList<T>, Type>
{}
export class MerkleListShift<T extends Type> extends source("MerkleListShift")<MerkleList<T>> {}
export class MerkleListPop<T extends Type> extends source("MerkleListPop")<MerkleList<T>> {}
export class MerkleListAt<T extends Type> extends source("MerkleListAt")<T, {
  list: MerkleList
  index: u256
}> {}

export interface MerkleList<T extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleList<T>>>
{}
export function MerkleList<T extends Type>(elementType: new() => T) {
  return class
    extends type("MerkleList", { elementType })<MerkleListNative<Type.Native<T>>, never, never>
  {
    length = new MerkleListLength(new u256()).value()

    prepend(value: T): MerkleList<T> {
      return new MerkleListPrepend(this, value).value()
    }

    append(value: T): MerkleList<T> {
      return new MerkleListAppend(this, value).value()
    }

    shift(): MerkleList<T> {
      return new MerkleListShift(this).value()
    }

    pop(): MerkleList<T> {
      return new MerkleListPop(this).value()
    }

    at(index: u256): T {
      return new MerkleListAt(new elementType(), {
        list: this,
        index,
      }).value()
    }

    first(): T {
      return this.at(u256.from(1))
    }

    last(): T {
      return this.at(this.length.subtract(u256.from(1)))
    }
  }
}

// TODO
export class MerkleListNative<T> {}
