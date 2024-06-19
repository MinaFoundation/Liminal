import { Mapping as MappingNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { None } from "./None.ts"
import { Union } from "./Union.ts"
import { Type, Value } from "./Value.ts"

export interface Mapping<K extends Value = any, V extends Value = any>
  extends InstanceType<ReturnType<typeof Mapping<K, V>>>
{}

export function Mapping<K extends Value, V extends Value>(
  keyType: Type<K>,
  valueType: Type<V>,
) {
  return class extends Value.make("Mapping")<
    MappingSource,
    MappingNative<Value.Native<K>, Value.Native<V>>,
    undefined
  > {
    keyType = keyType
    valueType = valueType

    size: u256 = new u256(new U256Source.MappingSize(this))

    set(key: Value.Args<[K]>[0], setter: Value.Setter<V>): Mapping<K, V> {
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

    reduceKeys<R extends Value, Y extends Value>(
      _initial: R,
      _f: (acc: R, cur: K) => Generator<Y, R>,
    ): Effect<R, Y> {
      unimplemented()
    }

    reduceValues<R extends Value, Y extends Value>(
      _initial: R,
      _f: (acc: R, cur: V) => Generator<Y, R>,
    ): Effect<R, Y> {
      unimplemented()
    }

    reduceEntries<R extends Value, Y extends Value>(
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
    constructor(readonly map: Mapping, readonly key: Value) {
      super()
    }
  }
  export class Delete extends Tagged("Delete") {
    constructor(readonly map: Mapping, readonly key: Value) {
      super()
    }
  }
  export class Set extends Tagged("Set") {
    constructor(
      readonly map: Mapping,
      readonly key: Value,
      readonly value: Value.Setter,
    ) {
      super()
    }
  }
}
