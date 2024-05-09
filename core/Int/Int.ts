import { bool } from "../Bool/Bool.js"
import { Constructor, Type } from "../Type/Type.js"
import {
  Add,
  Divide,
  Gt,
  Gte,
  Logarithm,
  Lt,
  Lte,
  Max,
  Min,
  Multiply,
  Square,
  Subtract,
} from "./IntNode.js"

export class u8 extends Int("u18", false)<never, u16 | u32 | u64 | u128 | u256> {}
export class u16 extends Int("u16", false)<u8, u32 | u64 | u128 | u256> {}
export class u32 extends Int("u32", false)<u8 | u16, u64 | u128 | u256> {}
export class u64 extends Int("u64", false)<u8 | u16 | u32, u128 | u256> {}
export class u128 extends Int("u128", false)<u8 | u16 | u32 | u64, u256> {}
export class u256 extends Int("u256", false)<u8 | u16 | u32 | u64 | u128, never> {}
export class i8 extends Int("i18", true)<never, i16 | i32 | i64 | i128 | i256> {}
export class i16 extends Int("i16", true)<i8, i32 | i64 | i128 | i256> {}
export class i32 extends Int("i32", true)<i8 | i16, i64 | i128 | i256> {}
export class i64 extends Int("i64", true)<i8 | i16 | i32, i128 | i256> {}
export class i128 extends Int("i128", true)<i8 | i16 | i32 | i64, i256> {}
export class i256 extends Int("i256", true)<i8 | i16 | i32 | i64 | i256, never> {}

function Int<Name extends string, Signed extends boolean>(name: Name, signed: Signed) {
  return class<From extends Type, Into extends Type>
    extends Type.make(name, { signed })<number, From, Into>
  {
    static min<T extends Type>(this: Constructor<T>): T {
      return new Min(this).instance()
    }

    static max<T extends Type>(this: Constructor<T>): T {
      return new Max(this).instance()
    }

    add(value: this): this {
      return new Add(this, value).instance()
    }

    subtract(value: this): this {
      return new Subtract(this, value).instance()
    }

    multiply(value: this): this {
      return new Multiply(this, value).instance()
    }

    divide(value: this): this {
      return new Divide(this, value).instance()
    }

    square(): this {
      return new Square(this).instance()
    }

    logarithm(value: this): this {
      return new Logarithm(this, value).instance()
    }

    gt(value: this): bool {
      return new Gt(this, value).instance()
    }

    gte(value: this): bool {
      return new Gte(this, value).instance()
    }

    lt(value: this): bool {
      return new Lt(this, value).instance()
    }

    lte(value: this): bool {
      return new Lte(this, value).instance()
    }
  }
}
