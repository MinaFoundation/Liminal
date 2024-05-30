import { MerkleMap as MerkleMapNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { None } from "./None.ts"
import { Factory, Type } from "./Type.ts"
import { Union } from "./Union.ts"

export interface MerkleMap<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof MerkleMap<K, V>>>
{}

export function MerkleMap<K extends Type, V extends Type>(
  keyType: Factory<K>,
  valueType: Factory<V>,
) {
  return class extends Type.make("MerkleMap")<
    MerkleMapSource,
    MerkleMapNative<Type.Native<K>, Type.Native<V>>,
    undefined
  > {
    keyType = keyType
    valueType = valueType

    size: u256 = new u256(new U256Source.MerkleMapSize(this))

    set(key: K, value: V): MerkleMap<K, V> {
      return new this.ctor(new MerkleMapSource.Set(this, key, value))
    }

    delete(key: K): MerkleMap<K, V> {
      return new this.ctor(new MerkleMapSource.Delete(this, key))
    }

    get(key: K): V | None {
      return new (Union(None, this.valueType))(
        new MerkleMapSource.Get(this, key),
      ) as never as V | None
    }

    reduceKeys<R extends Type, Y extends Type>(
      _initial: R,
      _f: (acc: R, cur: K) => Generator<Y, R>,
    ): Effect<R, Y> {
      unimplemented()
    }

    reduceValues<R extends Type, Y extends Type>(
      _initial: R,
      _f: (acc: R, cur: V) => Generator<Y, R>,
    ): Effect<R, Y> {
      unimplemented()
    }

    reduceEntries<R extends Type, Y extends Type>(
      _initial: R,
      _f: (acc: R, cur: [K, V]) => Generator<Y, R>,
    ): Effect<R, Y> {
      unimplemented()
    }
  }
}

export type MerkleMapSource = MerkleMapSource.Get | MerkleMapSource.Set | MerkleMapSource.Delete
export namespace MerkleMapSource {
  export class Get extends Tagged("Get") {
    constructor(readonly map: MerkleMap, readonly key: Type) {
      super()
    }
  }
  export class Delete extends Tagged("Delete") {
    constructor(readonly map: MerkleMap, readonly key: Type) {
      super()
    }
  }
  export class Set extends Tagged("Set") {
    constructor(
      readonly map: MerkleMap,
      readonly key: Type,
      readonly value: Type,
    ) {
      super()
    }
  }
}
