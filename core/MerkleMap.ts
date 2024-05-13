import { MerkleMap as MerkleMapNative } from "../lib/mod.ts"
import { Effect } from "./Effect.ts"
import { u256 } from "./Int.ts"
import { ConstructorNode, TypeNode } from "./Node.ts"
import { None } from "./None.ts"
import { Type } from "./Type.ts"

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: new() => K,
  valueType: new() => V,
) {
  return class extends Type.make("MerkleMap", { keyType, valueType })<
    MerkleMapNative<Type.Native<K>, Type.Native<V>>,
    undefined
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

export class MerkleMapSize extends ConstructorNode("MerkleMapSize")<u256> {
  constructor(readonly list: MerkleMap) {
    super(u256)
  }
}

export class MerkleMapGet<K extends Type = any, V extends Type = any>
  extends ConstructorNode("MerkleMapGet")<V>
{
  constructor(readonly map: MerkleMap<K, V>, readonly key: K, valueType: new() => V) {
    super(valueType)
  }
}

export class MerkleMapDelete<K extends Type = any, V extends Type = any>
  extends TypeNode("MerkleMapSet")<MerkleMap<K, V>>
{
  constructor(map: MerkleMap<K, V>, readonly key: K) {
    super(map)
  }
}

export class MerkleMapSet<K extends Type = any, V extends Type = any>
  extends TypeNode("MerkleMapSet")<MerkleMap<K, V>>
{
  constructor(map: MerkleMap<K, V>, readonly key: K, readonly value: V) {
    super(map)
  }
}
