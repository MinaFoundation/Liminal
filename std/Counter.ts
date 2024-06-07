import { bool, Factory, Struct, true as true_, u256, UnsignedInt } from "../core/mod.ts"

export function Counter<T extends UnsignedInt>(factory: Factory<T>) {
  return class extends Struct({
    maxReached: bool,
    nextId: factory,
  }) {
    // TODO: reconsider upon thinking through default values
    static init() {
      return this.new({
        maxReached: false,
        nextId: null!, // TODO
      })
    }

    *next() {
      const { nextId, maxReached } = this.fields
      yield* maxReached.if(MaxCountReached.new())["?"](MaxCountReached)
      yield* nextId
        .equals(u256.max())
        .not()
        .if(nextId.assign(nextId.add(1 as never)))
        .else(maxReached.assign(true_))
      return nextId
    }
  }
}

export class MaxCountReached extends Struct({ tag: "MaxCountReached" }) {}
