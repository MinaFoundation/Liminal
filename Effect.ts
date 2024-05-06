export function Effect<T extends string>(tag: T) {
  return class<Y, O = never> implements Generator<Y, O> {
    readonly tag = tag

    next(): IteratorResult<Y, O> {
      throw 0
    }

    return(): IteratorResult<Y, O> {
      throw 0
    }

    throw(): IteratorResult<Y, O> {
      throw 0
    }

    [Symbol.iterator](): Generator<Y, O> {
      throw 0
    }
  }
}
