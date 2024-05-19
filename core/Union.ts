import { MerkleListSource } from "./MerkleList.ts"
import { MerkleMapSource } from "./MerkleMap.ts"
import { Factory, Type } from "./Type.ts"

export function Union<T extends Factory[]>(members: [...T]) {
  return class extends Type.make("Union")<UnionSource, Type.Native<InstanceType<T[number]>>> {
    members = members
  }
}

export type UnionSource = MerkleMapSource.Get | MerkleListSource.At
