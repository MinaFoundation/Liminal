import { Effect } from "core/Effect/Effect.js"
import { MerkleMap as MerkleMapNative } from "../../lib/mod.js"
import { u256 } from "../Int/Int.js"
import { None } from "../None/None.js"
import { Constructor, Type } from "../Type/Type.js"
import { MerkleMapDelete, MerkleMapGet, MerkleMapSet, MerkleMapSize } from "./MerkleMapNode.js"

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: Constructor<K>,
  valueType: Constructor<V>,
) {
  return class extends Type.make("MerkleMap", { keyType, valueType })<
    MerkleMapNative<Type.Native<K>, Type.Native<V>>
  > {
    size: u256 = new MerkleMapSize(this).instance()

    set(key: K, value: V): MerkleMap<K, V> {
      return new MerkleMapSet(this, key, value).instance()
    }

    delete(key: K): MerkleMap<K, V> {
      return new MerkleMapDelete(this, key).instance()
    }

    get(key: K): V | None {
      return new MerkleMapGet(this, key, valueType).instance()
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
