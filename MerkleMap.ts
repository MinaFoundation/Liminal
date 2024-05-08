import { Effect } from "Effect.js"
import { bool } from "./bool.js"
import { u256 } from "./int.js"
import { None } from "./None.js"
import { Source } from "./Source.js"
import { Type } from "./Type.js"

export class MerkleMapSize extends Source("MerkleMapSize")<u256> {}
export class MerkleMapGet<K extends Type> extends Source("MerkleMapGet")<K, Type> {}
export class MerkleMapHas extends Source("MerkleMapHas")<bool, Type> {}
export class MerkleMapDelete<K extends Type, V extends Type>
  extends Source("MerkleMapDelete")<MerkleMap<K, V>, Type>
{}
export class MerkleMapSet<K extends Type, V extends Type>
  extends Source("MerkleMapSet")<MerkleMap<K, V>, {
    key: Type
    value: Type
  }>
{}

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: new() => K,
  valueType: new() => V,
) {
  return class extends Type.new("MerkleMap", { keyType, valueType })<
    MerkleMapNative<Type.Native<K>, Type.Native<V>>
  > {
    size = new MerkleMapSize(new u256()).value()

    set(key: K, value: V): MerkleMap<K, V> {
      return new MerkleMapSet(this, { key, value }).value()
    }

    delete(key: K): MerkleMap<K, V> {
      return new MerkleMapDelete(this, key).value()
    }

    get(key: K): V | None {
      return new MerkleMapGet(new valueType(), key).value()
    }

    has(key: K): bool {
      return new MerkleMapHas(new bool(), key).value()
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

// TODO
export class MerkleMapNative<K, V> {}
