import { None } from "liminal"
import { Effect, Result, Yield } from "../Effect/Effect.js"
import { Type } from "../Type/Type.js"
import { AssertNode, FalseNode, NotNode, TrueNode } from "./BoolNode.js"

const true_ = new TrueNode().instance()
export { true_ as true }
const false_ = new FalseNode().instance()
export { false_ as false }

export class bool extends Type.make("bool")<boolean, never, never> {
  if<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): If<Y, R> {
    return new If(this, f)
  }

  not(): bool {
    return new NotNode(this).instance()
  }

  assert<E extends Type>(error: E): E {
    return new AssertNode(this, error).instance()
  }
}

export class If<Y extends Yield, R extends Result> extends Effect<Y, R | None> {
  constructor(
    readonly self: bool,
    readonly f: () => Generator<Y, R>,
  ) {
    super()
  }

  else<Y2 extends Yield>(f: () => Generator<Y2, R>): Effect<Y | Y2, R> {
    throw 0
  }
}
