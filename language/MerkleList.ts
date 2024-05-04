import { u256 } from "./int.js"
import { Type, TypeConstructor } from "./Type.js"

export function MerkleList<T extends TypeConstructor>(elementType: T) {
  return class
    extends Type<"MerkleList", MerkleListNative<InstanceType<T>>, { elementType: T }, never, never>
  {
    length = new u256()

    constructor() {
      super("MerkleList", { elementType })
    }

    push(value: InstanceType<T>) {
      throw 0
    }

    unshift(value: InstanceType<T>) {
      throw 0
    }

    pop(): InstanceType<T> {
      throw 0
    }

    shift(): InstanceType<T> {
      throw 0
    }
  }
}

export class MerkleListNative<T> {
  todo(key: T) {}
}
