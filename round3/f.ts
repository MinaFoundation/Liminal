import { Predicate } from "./Type.js"
import { Matcher } from "./Union.js"

export interface f<A extends unknown[], Y, O> {
  (...args: A): Call<A, Y, O>
}

export declare function f<A extends unknown[], Y, O>(f: (...args: A) => Generator<Y, O>): f<A, Y, O>

export interface Call<A extends unknown[], Y, O> extends Generator<Y, O> {
  tag: "Call"
  f: (...args: A) => Generator<Y, O>
  args: A
  when: <MV extends Y>(
    match: Predicate<MV>,
    f: (value: MV) => Generator<Y, O>,
  ) => Matcher<Predicate<Exclude<Y, MV>>, Y, O>
}
