import { bool } from "./bool.js"
import { Reduce } from "./common.js"
import { u256 } from "./int.js"
import { Type } from "./Type.js"

export function MerkleMap<
  K extends new(...args: any) => Type,
  V extends new(...args: any) => Type,
>(
  keyType: K,
  valueType: V,
) {
  return class
    extends Type<
      "MerkleMap",
      MerkleMapNative<InstanceType<K>, InstanceType<V>>,
      { keyType: K; valueType: V },
      never,
      never
    >
  {
    size = new u256()

    constructor() {
      super("MerkleMap", { keyType, valueType })
    }

    set(key: InstanceType<K>, value: InstanceType<V>): InstanceType<V> {
      throw 0
    }

    delete(key: InstanceType<K>): InstanceType<V> {
      throw 0
    }

    get(key: InstanceType<K>): InstanceType<V> {
      throw 0
    }

    has(key: InstanceType<K>): bool {
      throw 0
    }

    declare reduceKeys: Reduce<InstanceType<K>>
    declare reduceValues: Reduce<InstanceType<V>>
    declare reduceEntries: Reduce<[InstanceType<K>, InstanceType<V>]>
  }
}

export class MerkleMapNative<K, V> {
  todo(key: K, value: V): void {
    throw 0
  }
}
