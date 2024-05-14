import { MerkleMap as MerkleMapNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { None } from "./None.ts"
import { Factory, Type } from "./Type.ts"

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: Factory<K>,
  valueType: Factory<V>,
) {
  return class extends Type.make("MerkleMap", { keyType, valueType })<
    MerkleMapSource,
    MerkleMapNative<Type.Native<K>, Type.Native<V>>,
    undefined
  > {
    size: u256 = new u256(new U256Source.MerkleMapSize(this))

    set(key: K, value: V): MerkleMap<K, V> {
      return new this.ctor(new MerkleMapSource.Set({ map: this, key, value }))
    }

    delete(key: K): MerkleMap<K, V> {
      return new this.ctor(new MerkleMapSource.Delete({ map: this, key }))
    }

    get(key: K): V | None {
      return new this.ctor(new MerkleMapSource.Get({ map: this, key }))
    }

    reduceKeys<R extends Type, Y extends Type>(
      initial: R,
      f: (acc: R, cur: K) => Generator<Y, R>,
    ): Effect<R, Y> {
      throw 0
    }

    reduceValues<R extends Type, Y extends Type>(
      initial: R,
      f: (acc: R, cur: V) => Generator<Y, R>,
    ): Effect<R, Y> {
      throw 0
    }

    reduceEntries<R extends Type, Y extends Type>(
      initial: R,
      f: (acc: R, cur: [K, V]) => Generator<Y, R>,
    ): Effect<R, Y> {
      throw 0
    }
  }
}

export type MerkleMapSource = MerkleMapSource.Get | MerkleMapSource.Set | MerkleMapSource.Delete
export namespace MerkleMapSource {
  export class Get extends Tagged("Get")<{ map: MerkleMap; key: Type }> {}
  export class Delete extends Tagged("Delete")<{ map: MerkleMap; key: Type }> {}
  export class Set extends Tagged("Set")<{ map: MerkleMap; key: Type; value: Type }> {}
}
