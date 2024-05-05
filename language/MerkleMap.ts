import { bool } from "./bool.js"
import { u256 } from "./int.js"
import { reduce } from "./reduce.js"
import { source } from "./Source.js"
import { Type } from "./Type.js"

export class MerkleMapSizeSource extends source("MerkleMapSize")<u256> {}
export class MerkleMapGetSource<T extends Type> extends source("MerkleMapGet")<T, { key: Type }> {}
export class MerkleMapHasSource extends source("MerkleMapHas")<bool, { key: Type }> {}
export class MerkleMapDeleteSource<K extends Type, V extends Type>
  extends source("MerkleMapDelete")<MerkleMap<K, V>, { key: K }>
{}
export class MerkleMapSetSource<K extends Type, V extends Type>
  extends source("MerkleMapSet")<MerkleMap<K, V>, { key: K; value: V }>
{}

export interface MerkleMap<K extends Type, V extends Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}
export function MerkleMap<K extends Type, V extends Type>(
  keyType: new() => K,
  valueType: new() => V,
) {
  return class extends Type<
    "MerkleMap",
    MerkleMapNative<K, V>,
    {
      keyType: new() => K
      valueType: new() => V
    },
    never,
    never
  > {
    size = new MerkleMapSizeSource(new u256()).build()

    constructor() {
      super("MerkleMap", { keyType, valueType })
    }

    set(key: K, value: V): MerkleMap<K, V> {
      return new MerkleMapSetSource(this, { key, value }).build()
    }

    delete(key: K): MerkleMap<K, V> {
      return new MerkleMapDeleteSource<K, V>(this, { key }).build()
    }

    get(key: K): V {
      return new MerkleMapGetSource(new valueType(), { key }).build()
    }

    has(key: K): bool {
      return new MerkleMapHasSource(new bool(), { key }).build()
    }

    reduceKeys = reduce<K>()
    reduceValues = reduce<V>()
    reduceEntries = reduce<[K, V]>()
  }
}

export class MerkleMapNative<K, V> {
  todo(key: K, value: V) {}
}
