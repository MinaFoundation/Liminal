import { Effect } from "Effect.js"
import { bool } from "./bool.js"
import { u256 } from "./int.js"
import { source } from "./Source.js"
import { Type, type } from "./Type.js"

export class MerkleMapSize extends source("MerkleMapSize")<u256> {}
export class MerkleMapGet<K extends Type> extends source("MerkleMapGet")<K, Type> {}
export class MerkleMapHas extends source("MerkleMapHas")<bool, Type> {}
export class MerkleMapDelete<K extends Type, V extends Type>
  extends Effect("MerkleMapDelete")<never, MerkleMap<K, V>>
{
  constructor(readonly key: K) {
    super()
  }
}
export class MerkleMapSet<K extends Type, V extends Type>
  extends Effect("MerkleMapSet")<never, MerkleMap<K, V>>
{
  constructor(readonly key: K, readonly value: V) {
    super()
  }
}

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: new() => K,
  valueType: new() => V,
) {
  return class extends type("MerkleMap", { keyType, valueType })<
    MerkleMapNative<Type.Native<K>, Type.Native<V>>,
    never,
    never
  > {
    size = new MerkleMapSize(new u256()).value()

    set(key: K, value: V): MerkleMapSet<K, V> {
      return new MerkleMapSet(key, value)
    }

    delete(key: K): MerkleMapDelete<K, V> {
      return new MerkleMapDelete(key)
    }

    get(key: K): V {
      return new MerkleMapGet(new valueType(), key).value()
    }

    has(key: K): bool {
      return new MerkleMapHas(new bool(), key).value()
    }

    reduceKeys<R extends Type, Y>(
      initial: R,
      f: (acc: R, cur: K) => Generator<Y, R>,
    ): ReduceKeys<R, Y> {
      return new ReduceKeys(this, initial, f)
    }

    // reduceValues = reduce<V>()
    // reduceEntries = reduce<[K, V]>()
  }
}

export class ReduceKeys<R, Y> extends Effect("reduceKeys")<R, Y> {
  constructor(
    readonly self: MerkleMap,
    readonly initial: Type,
    readonly f: (acc: any, cur: any) => Generator,
  ) {
    super()
  }
}

// TODO
export class MerkleMapNative<K, V> {}
