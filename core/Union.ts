import { ListSource } from "./List.ts"
import { MappingSource } from "./Mapping.ts"
import { Factory, Type } from "./Type.ts"

export interface Union<T extends Factory[] = any>
  extends InstanceType<ReturnType<typeof Union<T>>>
{}

export function Union<T extends Factory[]>(...members: T) {
  return class extends Type.make("Union")<
    UnionSource,
    Type.Native<InstanceType<T[number]>>,
    Type.Native<InstanceType<T[number]>> | InstanceType<T[number]>
  > {
    members = members
  }
}

export namespace Union {
  export type Unwrap<T extends Type> = T extends Union<infer M> ? InstanceType<M[number]> : T
}

export type UnionSource = MappingSource.Get | ListSource.At
