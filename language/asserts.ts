export class AssertionError<T> {
  readonly tag = "AssertionError"
  constructor(readonly value: T) {}
}
