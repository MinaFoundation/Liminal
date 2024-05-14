import { MerkleList as MerkleListNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { Factory, Type } from "./Type.ts"

export interface MerkleList<T extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleList<T>>>
{}

export function MerkleList<T extends Type>(elementType: Factory<T>) {
  return class extends Type.make("MerkleList", { elementType })<
    MerkleListSource,
    MerkleListNative<Type.Native<T>>,
    undefined,
    never
  > {
    length: u256 = new u256(new U256Source.MerkleListSize(this))

    first = this.at(u256.new(1))

    last = this.at(this.length.subtract(u256.new(1)))

    prepend(value: T): MerkleList<T> {
      return new this.ctor(new MerkleListSource.Prepend({ list: this, value }))
    }

    append(value: T): MerkleList<T> {
      return new this.ctor(new MerkleListSource.Append({ list: this, value }))
    }

    shift(): MerkleList<T> {
      return new this.ctor(new MerkleListSource.Shift(this))
    }

    pop(): MerkleList<T> {
      return new this.ctor(new MerkleListSource.Pop(this))
    }

    at(index: u256): T {
      return new this.ctor(new MerkleListSource.At({ list: this, index }))
    }

    reduceKeys<R extends Type, Y extends Type>(
      initial: R,
      f: (acc: R, cur: T) => Generator<Y, R>,
    ): Effect<R, Y> {
      throw 0
    }
  }
}

export type MerkleListSource =
  | MerkleListSource.Prepend
  | MerkleListSource.Append
  | MerkleListSource.Shift
  | MerkleListSource.Pop
  | MerkleListSource.At
export namespace MerkleListSource {
  export class Prepend extends Tagged("Prepend")<{ list: MerkleList; value: Type }> {}
  export class Append extends Tagged("Append")<{ list: MerkleList; value: Type }> {}
  export class Shift extends Tagged("Shift")<MerkleList> {}
  export class Pop extends Tagged("Pop")<MerkleList> {}
  export class At extends Tagged("At")<{ list: MerkleList; index: u256 }> {}
}
