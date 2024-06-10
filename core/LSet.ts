import { Tagged } from "../util/Tagged.ts"
import { u256, U256Source } from "./Int.ts"
import { Type, Value } from "./Value.ts"

export interface LSet<T extends Value = any> extends InstanceType<ReturnType<typeof LSet<T>>> {}

export function LSet<T extends Value>(elementType: Type<T>) {
  return class extends Value.make("LSet")<LSetSource, Set<Value.Native<T>>, undefined, never> {
    elementType = elementType

    size: u256 = new u256(new U256Source.LSetSize(this))

    add(value: T): LSet<T> {
      return new this.ctor(new LSetSource.Add(this, value))
    }

    remove(value: T): LSet<T> {
      return new this.ctor(new LSetSource.Remove(this, value))
    }

    clear(): LSet<T> {
      return new this.ctor(new LSetSource.Clear(this))
    }
  }
}

export type LSetSource = LSetSource.Add | LSetSource.Remove | LSetSource.Clear
export namespace LSetSource {
  export class Add extends Tagged("Add") {
    constructor(readonly self: LSet, readonly value: Value) {
      super()
    }
  }
  export class Remove extends Tagged("Remove") {
    constructor(readonly self: LSet, readonly value: Value) {
      super()
    }
  }
  export class Clear extends Tagged("Clear") {
    constructor(readonly self: LSet) {
      super()
    }
  }
}
