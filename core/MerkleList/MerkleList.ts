import { MerkleList as MerkleListNative } from "../../lib/mod.js"
import { Effect } from "../Effect/Effect.js"
import { u256 } from "../Int/Int.js"
import { Type } from "../Type/Type.js"
import {
  MerkleListAppend,
  MerkleListAt,
  MerkleListLength,
  MerkleListPop,
  MerkleListPrepend,
  MerkleListShift,
} from "./MerkleListNode.js"

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
