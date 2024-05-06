import { Effect } from "Effect.js"
import { bool } from "./bool.js"
import { u256 } from "./int.js"
import { source } from "./Source.js"
import { Type, type } from "./Type.js"

export class MerkleMapSize extends source("MerkleMapSize")<u256> {}
export class MerkleMapGet<K extends Type> extends source("MerkleMapGet")<K, Type> {}
export class MerkleMapHas extends source("MerkleMapHas")<bool, Type> {}
export class MerkleMapDelete<K extends Type, V extends Type>
  extends source("MerkleMapDelete")<MerkleMap<K, V>, Type>
{}
export class MerkleMapSet<K extends Type, V extends Type>
  extends source("MerkleMapSet")<MerkleMap<K, V>, {
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
  return class extends type("MerkleMap", { keyType, valueType })<
    MerkleMapNative<Type.Native<K>, Type.Native<V>>,
    never,
    never
  > {
    size = new MerkleMapSize(new u256()).value()

    set(key: K, value: V): MerkleMap<K, V> {
      return new MerkleMapSet(this, { key, value }).value()
    }

    delete(key: K): MerkleMap<K, V> {
      return new MerkleMapDelete(this, key).value()
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
    ): MerkleMapReduceKeys<R, Y> {
      return new MerkleMapReduceKeys(this, initial, f)
    }

    reduceValues<R extends Type, Y>(
      initial: R,
      f: (acc: R, cur: V) => Generator<Y, R>,
    ): MerkleMapReduceValues<R, Y> {
      return new MerkleMapReduceValues(this, initial, f)
    }

    reduceEntries<R extends Type, Y>(
      initial: R,
      f: (acc: R, cur: [K, V]) => Generator<Y, R>,
    ): MerkleMapReduceEntries<R, Y> {
      return new MerkleMapReduceEntries(this, initial, f)
    }
  }
}

export class MerkleMapReduceKeys<R, Y> extends MerkleMapReduce("Keys")<R, Y> {}
export class MerkleMapReduceValues<R, Y> extends MerkleMapReduce("Values")<R, Y> {}
export class MerkleMapReduceEntries<R, Y> extends MerkleMapReduce("Entries")<R, Y> {}

function MerkleMapReduce<TK extends string>(tag: TK) {
  return class<R, Y> extends Effect(`MerkleMapReduce${tag}`)<R, Y> {
    constructor(
      readonly self: MerkleMap,
      readonly initial: Type,
      readonly f: (acc: any, cur: any) => Generator,
    ) {
      super()
    }
  }
}

// TODO
export class MerkleMapNative<K, V> {}
