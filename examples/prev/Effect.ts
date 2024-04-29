import { u8 } from "../../language/int.js"
import { Result } from "../../language/std/Result.js"
import { top, Type } from "../../language/type.js"

export type T = typeof T
export declare const T: unique symbol

export declare const X: unique symbol

export declare class Effect<T extends top, X> {
  [T]: T;
  [X]: X[]

  get ["?"](): T extends Result<infer T_, infer E> ? Effect<T_, Trap<E> | X> : never

  apply<K extends X extends Dep<infer K_, any> ? K_ : never>(
    this: [X] extends [never] ? never : Effect<T, X>,
    key: K,
    value: X extends Dep<K, infer T2> ? T2 : never,
  ): Effect<T, Omit<X, K>>
}

export type NodeGenerator<Y extends top, R extends top, N extends top, X> = Generator<
  Effect<Y, X>,
  Effect<R, X>,
  Effect<N, never>
>

export declare function dep<K extends keyof any, T extends top>(key: K, type: T): Effect<
  T,
  Dep<K, InstanceType<T>>
>

export declare const D: unique symbol
export type Dep<K extends keyof any, V extends InstanceType<top>> = { [D]: Record<K, V> }

export declare const U: unique symbol
export type Trap<U> = { [U]: U }

// export declare const S: unique symbol
// export type Signer<K extends keyof any> = { [S]: K }
// export declare const V: unique symbol
// export type Event<K extends keyof any, V extends InstanceType<top>> = { [V]: [K, V] }

class Foo extends Type("Foo", {})<number> {}
class FooError extends Type("FooError", {})<number> {}
class Bar extends Type("Bar", {})<number> {}

declare const foo: Effect<Result<typeof Foo, typeof FooError>, Dep<"fooDep", u8>>
declare const bar: Effect<typeof Bar, never>

function* tx() {
  const fooValue = foo["?"]
  const name = dep("Hello", u8)
  const a = dep("Another", u8)
  const c = dep("YetAnother!", u8)
  return c
  // const x = all(name, a, c)
  // const result = all(all(fooValue, bar), name)
  // yield bar
  // const f = result.apply("fooDep", new u8(1))
  // const applied = f.apply("Hello", new u8(2))
  // return all({ a: name, b: bar, applied })
}
