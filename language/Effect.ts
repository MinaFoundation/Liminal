// TODO: get rid of `self`? Implement on case-by-case basis
export class Effect<T extends string, Y, O> implements Generator<Y, O> {
  constructor(readonly tag: T, readonly self: unknown /* TODO: or narrow this? */) {}

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
