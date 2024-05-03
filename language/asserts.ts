export class AssertError<T> {
  readonly tag = "AssertError"
  constructor(readonly value: T) {}
}
