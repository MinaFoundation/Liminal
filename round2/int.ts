import { AnyType, Instance, Type } from "./Type.js"

export class Int<T extends AnyType> extends Instance<T> {
  add(value: this) {
    return this
  }

  subtract(value: this) {
    return this
  }

  multiply(value: this) {
    return this
  }

  divide(value: this) {
    return this
  }

  square() {
    return this
  }
}

export interface u256 extends Type<"u256", number, {}, Int<u256>, never> {}
export const u256: u256 = Type("u256", {}, Int)

export interface u128 extends Type<"u128", number, {}, Int<u128>, u256> {}
export const u128: u128 = Type("u128", {}, Int)

export interface u64 extends Type<"u64", number, {}, Int<u64>, u128 | u256> {}
export const u64: u64 = Type("u64", {}, Int)

export interface u32 extends Type<"u32", number, {}, Int<u32>, u64 | u128 | u256> {}
export const u32: u32 = Type("u32", {}, Int)

export interface u16 extends Type<"u16", number, {}, Int<u16>, u32 | u64 | u128 | u256> {}
export const u16: u16 = Type("u16", {}, Int)

export interface u8 extends Type<"u8", number, {}, Int<u8>, u16 | u32 | u64 | u128 | u256> {}
export const u8: u8 = Type("u8", {}, Int)

const z = u8
  .lift(1)
  .add(u8.lift(2))
  .into(u32)
  .add(u32.lift(2))
  .into(u64)
  .add(u64.lift(1))
  .add(u64.lift(1))
  .add(u64.lift(1))

// function context<T extends AnyTy>() {
//   return <U>(data: U & ThisType<Val<T>>): U => {
//     return null!
//   }
// }
