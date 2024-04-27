// import { Result } from "./types/type.js"

// export type T = typeof T
// export declare const T: unique symbol

// export namespace T {}

// export declare const X: unique symbol

// export class Node<T, X> {
//   declare [T]: T;
//   [X]: X[] = []

//   get ["?"](): T extends Result<infer T_, infer E> ? Node<T_, Trap<E> | X> : never {
//     throw 0
//   }

//   apply<K extends X extends Dep<infer K_, any> ? K_ : never>(
//     this: [X] extends [never] ? never : Node<T, X>,
//     key: K,
//     value: X extends Dep<K, infer T2> ? T2 : never,
//   ): Node<T, Exclude<X, Dep<K, any>>> {
//     throw 0
//   }
// }

// export type NodeGenerator<Y, R, N, X> = Generator<
//   Node<Y, X>,
//   Node<R, X>,
//   Node<N, never>
// >

// export type Env<T, X> = T | X

// export declare function dep<T>(): <K extends keyof any>(key: K) => Node<T, Dep<K, T>>

// export declare const U: unique symbol
// export type Trap<U> = { [U]: U }

// export declare const D: unique symbol
// export type Dep<K extends keyof any, V> = { [D]: [K, V] }

// // export declare function statements<T, E, X>(
// //   f: (this: TxContext) => Node<T, Env<Trap<E>, X>>,
// // ): Node<Result<T, E>, X>
// // export declare function statements<Y, R, N, E, X>(
// //   f: (this: TxContext) => NodeGenerator<Y, R, N, Env<Trap<E>, X>>,
// // ): NodeGenerator<Result<Y, E>, Result<R, E>, N, X>

// //

// class TxContext {
//   sender: string
// }

// class Foo {
//   readonly tag = "Baz"
// }
// class FooError {
//   readonly tag = "FooError"
// }
// class Bar {
//   readonly tag = "Bar"
// }

// declare const foo: Node<Result<Foo, FooError>, Dep<"fooDep", string>>
// declare const bar: Node<Bar, never>

// export declare function all<I extends Node<any, any>[]>(...items: I): Node<
//   { [K in keyof I]: I[K] extends Node<infer T, infer _U> ? T : I[K] },
//   I[number] extends Node<any, infer X> ? X : never
// >
// export declare function all<F extends Record<keyof any, Node<any, any>>>(fields: F): Node<
//   { [K in keyof F]: F[K] extends Node<infer T, infer _U> ? T : F[K] },
//   F[keyof F] extends Node<any, infer X> ? X : never
// >

// class BarNode<X> extends Node<Bar, X> {
//   wrap() {
//     return all(this)
//   }
// }

// function* tx(this: TxContext) {
//   const fooValue = foo["?"]
//   const name = dep<string>()("Hello")
//   const result = all(all(fooValue, bar), name)
//   yield bar // .into(BarNode).wrap()
//   const f = result.apply("fooDep", "")
//   const applied = f.apply("Hello", "")
//   return all({ a: name, b: bar })
// }

// // trap
// // deps
// // sign
// // event
