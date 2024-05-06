export function Effect<T extends string>(tag: T) {
  return class<Y, R = never> implements Generator<Y, R> {
    readonly tag = tag

    next(): IteratorResult<Y, R> {
      throw 0
    }

    return(): IteratorResult<Y, R> {
      throw 0
    }

    throw(): IteratorResult<Y, R> {
      throw 0
    }

    [Symbol.iterator](): Generator<Y, R> {
      throw 0
    }
  }
}
