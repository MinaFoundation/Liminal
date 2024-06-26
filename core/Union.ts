import { ListSource } from "./List.ts"
import { MappingSource } from "./Mapping.ts"
import { Type, Value } from "./Value.ts"

export interface Union<T extends Type = any> extends InstanceType<UnionType<T>> {}
export type UnionType<T extends Type = any> = ReturnType<typeof Union<T[]>>

export function Union<T extends Type[]>(...members: T) {
  return class extends Value.make("Union")<
    UnionSource,
    Value.Native<InstanceType<T[number]>>,
    Value.Native<InstanceType<T[number]>> | InstanceType<T[number]>
  > {
    members = new Set(members)
  }
}

export type UnionSource = MappingSource.Get | ListSource.At
