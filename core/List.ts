import { List as ListNative } from "../lib/mod.ts"
import { Tagged } from "../util/Tagged.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Effect } from "./Effect.ts"
import { u256, U256Source } from "./Int.ts"
import { None } from "./None.ts"
import { Union } from "./Union.ts"
import { Type, Value } from "./Value.ts"

export interface List<T extends Value = any> extends InstanceType<ReturnType<typeof List<T>>> {}

export function List<T extends Value>(elementType: Type<T>) {
  return class
    extends Value.make("List")<ListSource, ListNative<Value.Native<T>>, undefined, never>
  {
    elementType = elementType

    length: u256 = new u256(new U256Source.ListSize(this))

    first = this.at(u256.new(1))

    last = this.at(this.length.subtract(u256.new(1)))

    prepend(value: T): List<T> {
      return new this.ctor(new ListSource.Prepend(this, value))
    }

    append(value: T): List<T> {
      return new this.ctor(new ListSource.Append(this, value))
    }

    shift(): List<T> {
      return new this.ctor(new ListSource.Shift(this))
    }

    pop(): List<T> {
      return new this.ctor(new ListSource.Pop(this))
    }

    at(index: u256): T | None {
      return new (Union(None, this.elementType))(
        new ListSource.At(this, index),
      ) as never as T | None
    }

    reduce<R extends Value, Y extends Value>(
      initial: R,
      f: (acc: R, cur: T) => Generator<Y, R>,
    ): Effect<Y, R>
    reduce<R extends Value>(initial: R, f: (acc: R, cur: T) => R): R
    reduce<Y extends Value, R extends Value>(
      _initial: R,
      _f: (acc: R, cur: T) => R | Generator<Y, R>,
    ): any {
      unimplemented()
    }
  }
}

export type ListSource =
  | ListSource.Prepend
  | ListSource.Append
  | ListSource.Shift
  | ListSource.Pop
  | ListSource.At
export namespace ListSource {
  export class Prepend extends Tagged("Prepend") {
    constructor(readonly self: List, readonly value: Value) {
      super()
    }
  }
  export class Append extends Tagged("Append") {
    constructor(readonly self: List, readonly value: Value) {
      super()
    }
  }
  export class Shift extends Tagged("Shift") {
    constructor(readonly self: List) {
      super()
    }
  }
  export class Pop extends Tagged("Pop") {
    constructor(readonly self: List) {
      super()
    }
  }
  export class At extends Tagged("At") {
    constructor(readonly list: List, readonly index: u256) {
      super()
    }
  }
}
