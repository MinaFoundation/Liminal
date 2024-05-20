import { MerkleListSource } from "./MerkleList.ts"
import { MerkleMapSource } from "./MerkleMap.ts"
import { Factory, Type } from "./Type.ts"

export function union<T extends Factory[]>(members: [...T], source: UnionSource) {
  return new (Union(...members))(source) as InstanceType<T[number]>
}

export function Union<T extends Factory[]>(...members: T) {
  return class Union extends Type.make("Union")<UnionSource, Type.Native<InstanceType<T[number]>>> {
    members = members
  }
}

export type UnionSource = MerkleMapSource.Get | MerkleListSource.At
