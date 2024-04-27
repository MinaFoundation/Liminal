// import { Effect, Context } from "effect"

// export class Random extends Context.Tag("Random")<
//   Random,
//   { readonly next: Effect.Effect<number> }
// >() {}

export function type<K extends keyof any>(tag: K) {
  return class<T> {
    readonly tag = tag
    constructor(readonly value: T) {}
  }
}

export function int<S extends boolean, B extends 8 | 16 | 32 | 64>(
  signed: S,
  bytes: B,
) {
  return class
    extends type(`${(signed ? "i" : "u") as S extends true ? "i" : "u"}${bytes}`)<number>
  {
    add(value: this) {
      return {
        op: "Add",
        left: this,
        right: value,
      }
    }
  }
}

export class u8 extends int(false, 8) {}
export class u16 extends int(false, 16) {}
export class u32 extends int(false, 32) {}
export class u64 extends int(false, 64) {}
export class i8 extends int(true, 8) {}
export class i16 extends int(true, 16) {}
export class i32 extends int(true, 32) {}
export class i64 extends int(true, 64) {}

new i32(1).add(new i32(4))

// export type Variants = Record<keyof any, any>

// export type Enum<V extends Variants> = ReturnType<typeof Enum<V>>
// export function Enum<V extends Variants>(variants: V) {
//   return class Variant {
//     static from<K extends keyof V>(key: K, value: V[K]): InstanceType<Enum<V>> {
//       throw 0
//     }

//     readonly variants = variants
//   }
// }

// export type MatchArms<V extends Variants, R> = (
//   arms: { [K in keyof V]: V[K] },
// ) => R

// export type Result<T, E> = ReturnType<typeof Result<T, E>>
// export function Result<T, E>(Value: T, Error: E) {
//   return class Result extends Enum<{
//     Value: T
//     Error: E
//   }>({ Value, Error }) {}
// }
