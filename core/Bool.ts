import { Result, Yield } from "./CommandLike.ts"
import { Effect } from "./Effect.ts"
import { ConstructorNode, TypeNode } from "./Node.ts"
import { None } from "./None.ts"
import { Type } from "./Type.ts"

export class TrueNode extends ConstructorNode("true")<bool> {
  constructor() {
    super(bool)
  }
}

export class FalseNode extends ConstructorNode("false")<bool> {
  constructor() {
    super(bool)
  }
}

export class NotNode extends TypeNode("not")<bool> {}

export class AssertNode<E extends Type> extends TypeNode("Assert")<E> {
  constructor(readonly truthy: bool, readonly error: E) {
    super(error)
  }
}

export class bool extends Type.make("bool")<boolean, never, never> {
  if<Y extends Yield, R extends Result>(f: () => Generator<Y, R>): If<Y, R> {
    return new If(this, f)
  }

  not(): bool {
    return new NotNode(this).instance()
  }

  assert<E extends Type>(error: E): Effect<E, never> {
    throw 0
    // return new AssertNode(this, error).instance()
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

const true_ = new TrueNode().instance()
export { true_ as true }
const false_ = new FalseNode().instance()
export { false_ as false }
