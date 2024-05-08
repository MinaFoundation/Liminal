import { bool } from "./bool.js"
import { BinaryOperationSource, TypeSource } from "./Source.js"
import { Type } from "./Type.js"

export class u8 extends Int("u18", false)<never, u16 | u32 | u64 | u128 | u256> {}
export class u16 extends Int("u16", false)<u8, u32 | u64 | u128 | u256> {}
export class u32 extends Int("u32", false)<u8 | u16, u64 | u128 | u256> {}
export class u64 extends Int("u64", false)<u8 | u16 | u32, u128 | u256> {}
export class u128 extends Int("u128", false)<u8 | u16 | u32 | u64, u256> {}
export class u256 extends Int("u256", false)<u8 | u16 | u32 | u64 | u256, never> {}

export class i8 extends Int("i18", true)<never, i16 | i32 | i64 | i128 | i256> {}
export class i16 extends Int("i16", true)<i8, i32 | i64 | i128 | i256> {}
export class i32 extends Int("i32", true)<i8 | i16, i64 | i128 | i256> {}
export class i64 extends Int("i64", true)<i8 | i16 | i32, i128 | i256> {}
export class i128 extends Int("i128", true)<i8 | i16 | i32 | i64, i256> {}
export class i256 extends Int("i256", true)<i8 | i16 | i32 | i64 | i256, never> {}

export function Int<Name extends string, Signed extends boolean>(name: Name, signed: Signed) {
  return class<From extends Type, Into extends Type>
    extends Type.new(name, { signed })<number, From, Into>
  {
    static min<T extends Type>(this: new() => T): T {
      return new Min(new this()).value()
    }
    static max<T extends Type>(this: new() => T): T {
      return new Max(new this()).value()
    }

    add(value: this): this {
      return new Add(this, { value }).target()
    }

    subtract(value: this): this {
      return new Subtract(this, { value }).target()
    }

    multiply(value: this): this {
      return new Multiply(this, { value }).value()
    }

    divide(value: this): this {
      return new Divide(this, { value }).value()
    }

    square(): this {
      return new Square(this).value()
    }

    gt(value: this): bool {
      return new Gt(new bool(), { self: this, value }).value()
    }

    gte(value: this): bool {
      return new Gte(new bool(), { self: this, value }).value()
    }

    lt(value: this): bool {
      return new Lt(new bool(), { self: this, value }).value()
    }

    lte(value: this): bool {
      return new Lte(new bool(), { self: this, value }).value()
    }
  }
}

export class Min<T extends Type> extends TypeSource("Min")<T> {}
export class Max<T extends Type> extends TypeSource("Max")<T> {}

export class Gt extends BinaryOperationSource("Gt")<bool> {}
export class Gte extends BinaryOperationSource("Gte")<bool> {}
export class Lt extends BinaryOperationSource("Lt")<bool> {}
export class Lte extends BinaryOperationSource("Lte")<bool> {}

export class Add<T extends Type> extends BinaryOperationSource("Add")<T> {}
export class Subtract<T extends Type> extends BinaryOperationSource("Subtract")<T> {}
export class Multiply<T extends Type> extends BinaryOperationSource("Multiply")<T> {}
export class Divide<T extends Type> extends BinaryOperationSource("Divide")<T> {}

export class Logarithm<T extends Type> extends TypeSource("Logarithm")<T, { value: Type }> {}
export class Square<T extends Type> extends TypeSource("Square")<T> {}
