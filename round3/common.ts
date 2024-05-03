export type Reduce<T> = <A, Y>(
  initial: A,
  f: (acc: A, cur: T) => Generator<Y, A>,
) => ReduceResult<A, Y>

export interface ReduceResult<Y, O> extends Generator<Y, O> {
  tag: "ReduceResult"
}
