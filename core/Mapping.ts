import { Mapping as MappingNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { None } from "./None.ts"
import { Factory, Type } from "./Type.ts"
import { Union } from "./Union.ts"

export interface Mapping<K extends Type = Type, V extends Type = Type>
  extends InstanceType<ReturnType<typeof Mapping<K, V>>>
{}

export function Mapping<K extends Type, V extends Type>(
  keyType: Factory<K>,
  valueType: Factory<V>,
) {
  return class extends Type.make("Mapping")<
    MappingSource,
    MappingNative<Type.Native<K>, Type.Native<V>>,
    undefined
  > {
    keyType = keyType
    valueType = valueType

    size: u256 = new u256(new U256Source.MappingSize(this))

    set(key: K, setter: V): Mapping<K, V> {
      return new this.ctor(new MappingSource.Set(this, key, setter))
    }

    delete(key: K): Mapping<K, V> {
      return new this.ctor(new MappingSource.Delete(this, key))
    }

    get(key: K): V | None {
      return new (Union(None, this.valueType))(
        new MappingSource.Get(this, key),
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

export type MappingSource = MappingSource.Get | MappingSource.Set | MappingSource.Delete
export namespace MappingSource {
  export class Get extends Tagged("Get") {
    constructor(readonly map: Mapping, readonly key: Type) {
      super()
    }
  }
  export class Delete extends Tagged("Delete") {
    constructor(readonly map: Mapping, readonly key: Type) {
      super()
    }
  }
  export class Set extends Tagged("Set") {
    constructor(
      readonly map: Mapping,
      readonly key: Type,
      readonly value: Type,
    ) {
      super()
    }
  }
}
