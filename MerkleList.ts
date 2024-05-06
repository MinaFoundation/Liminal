import { u256 } from "./int.js"
import { source } from "./Source.js"
import { Type } from "./Type.js"

export class MerkleListLengthSource extends source("MerkleListLength")<u256> {}
export class MerkleListPrependSource<T extends Type>
  extends source("MerkleListPrepend")<MerkleList<T>, Type>
{}

export interface MerkleList<T extends Type>
  extends InstanceType<ReturnType<typeof MerkleList<T>>>
{}
export function MerkleList<T extends Type>(elementType: new() => T) {
  return class
    extends Type<"MerkleList", MerkleListNative<T>, { elementType: new() => T }, never, never>
  {
    length = new MerkleListLengthSource(new u256()).build()

    constructor() {
      super("MerkleList", { elementType })
    }

    prepend(value: T): MerkleList<T> {
      return new MerkleListPrependSource(this, value).build()
    }

    append(value: T): MerkleList<T> {
      throw 0
    }

    shift(): MerkleList<T> {
      throw 0
    }

    pop(): MerkleList<T> {
      throw 0
    }

    first(): T {
      throw 0
    }

    last(): T {
      throw 0
    }

    at(index: u256): T {
      throw 0
    }
  }
}

export class MerkleListNative<T> {
  todo(key: T) {}
}
