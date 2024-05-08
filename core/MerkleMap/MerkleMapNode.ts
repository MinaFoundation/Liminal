import { u256 } from "../Int/Int.js"
import { ConstructorSource, StaticConstructorSource, TypeSource } from "../Source.js"
import { Constructor, Type } from "../Type/Type.js"
import { MerkleMap } from "./MerkleMap.js"

export class MerkleMapSize extends StaticConstructorSource("MerkleMapSize", u256) {
  constructor(readonly list: MerkleMap) {
    super()
  }
}

export class MerkleMapGet<K extends Type = any, V extends Type = any>
  extends ConstructorSource("MerkleMapGet")<V>
{
  constructor(readonly map: MerkleMap<K, V>, readonly key: K, valueType: Constructor<V>) {
    super(valueType)
  }
}

export class MerkleMapDelete<K extends Type = any, V extends Type = any>
  extends TypeSource("MerkleMapSet")<MerkleMap<K, V>>
{
  constructor(map: MerkleMap<K, V>, readonly key: K) {
    super(map)
  }
}

export class MerkleMapSet<K extends Type = any, V extends Type = any>
  extends TypeSource("MerkleMapSet")<MerkleMap<K, V>>
{
  constructor(map: MerkleMap<K, V>, readonly key: K, readonly value: V) {
    super(map)
  }
}
