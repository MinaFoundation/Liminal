import { u256 } from "../Int/Int.js"
import { ConstructorNode, TypeNode } from "../Node.js"
import { Constructor, Type } from "../Type/Type.js"
import { MerkleMap } from "./MerkleMap.js"

export class MerkleMapSize extends ConstructorNode("MerkleMapSize")<u256> {
  constructor(readonly list: MerkleMap) {
    super(u256)
  }
}

export class MerkleMapGet<K extends Type = any, V extends Type = any>
  extends ConstructorNode("MerkleMapGet")<V>
{
  constructor(readonly map: MerkleMap<K, V>, readonly key: K, valueType: Constructor<V>) {
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
