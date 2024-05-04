import { Predicate, Value } from "./Type.js"
import { Matcher } from "./Union.js"

export interface f<A extends unknown[], Y, O> {
  (...args: A): Call<A, Y, O>
}

export declare function f<A extends unknown[], Y, O>(f: (...args: A) => Generator<Y, O>): f<A, Y, O>

export interface Call<A extends unknown[], Y, O> extends Generator<Y, O> {
  tag: "Call"
  f: (...args: A) => Generator<Y, O>
  args: A
  when: <M extends Predicate<Y>>(
    match: M,
    f: (value: Value<M>) => Generator<Y, O>,
  ) => Matcher<Exclude<Y, Value<M>>, Y, O>
}
