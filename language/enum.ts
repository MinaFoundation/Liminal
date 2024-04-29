import { Native, top, Type } from "./type.js"

export type Variants = Record<any, top>

export type EnumNative<M extends Variants, K extends keyof M = keyof M> = {
  [K in keyof M]:
    & { tag: K }
    & ([M[K]] extends [never] ? {} : { value: Native<M[K]> })
}[K]

enum_.name = "enum"
export function enum_<M extends Variants>(variantTypes: M) {
  return class extends Type("enum", {
    variantTypes,
  })<EnumNative<M>> {
    declare match: <O extends InstanceType<top>>(arms: MatchArms<M, O>) => O

    declare expect: <K extends keyof M>(
      when: K,
    ) => Generator<
      Catch<{ [K2 in keyof M]: K2 extends K ? never : M[K2] }[keyof M]>,
      M[K],
      unknown
    >
  }
}

export type Catch<T> = {
  catch: T
}

export type MatchArms<M extends Variants, O extends InstanceType<top>> = {
  [K in keyof M]: (value: InstanceType<M[K]>) => O
}

// export declare class Effect<T extends top, X> {
//   [T]: T;
//   [X]: X[]

//   get ["?"](): T extends Result<infer T_, infer E> ? Effect<T_, Trap<E> | X> : never

//   apply<K extends X extends Dep<infer K_, any> ? K_ : never>(
//     this: [X] extends [never] ? never : Effect<T, X>,
//     key: K,
//     value: X extends Dep<K, infer T2> ? T2 : never,
//   ): Effect<T, Omit<X, K>>
// }
