import { bool } from "bool.js"
import { source } from "./Source.js"
import { Type } from "./Type.js"

export class Add<T extends Int> extends source("Add")<T, { value: Type }> {}
export class Subtract<T extends Int> extends source("Subtract")<T, { value: Type }> {}
export class Multiply<T extends Int> extends source("Multiply")<T, { value: Type }> {}
export class Divide<T extends Int> extends source("Divide")<T, { value: Type }> {}
export class Logarithm<T extends Int> extends source("Logarithm")<T, { value: Type }> {}
export class Square<T extends Int> extends source("Square")<T> {}
export class Min<T extends Int> extends source("Min")<T> {}
export class Max<T extends Int> extends source("Max")<T> {}
export class Gt<T extends Int> extends source("Gt")<bool, {
  self: T
  value: Type
}> {}
export class Gte<T extends Int> extends source("Gte")<bool, {
  self: T
  value: Type
}> {}
export class Lt<T extends Int> extends source("Lt")<bool, {
  self: T
  value: Type
}> {}
export class Lte<T extends Int> extends source("Lte")<bool, {
  self: T
  value: Type
}> {}

class Int<K extends string = any, From = any, Into extends Type = any, S extends boolean = any>
  extends Type<K, number, { signed: S }, From, Into>
{
  // TODO: get as instance, not method
  static min<T extends Int>(this: new() => T): T {
    return new Min(new this()).value()
  }
  // TODO: get as instance, not method
  static max<T extends Int>(this: new() => T): T {
    return new Max(new this()).value()
  }

  constructor(name: K, signed: S) {
    super(name, { signed })
  }

  add(value: this): this {
    return new Add(this, { value }).value()
  }

  subtract(value: this): this {
    return new Subtract(this, { value }).value()
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

export class u8 extends Int<"u18", never, u16 | u32 | u64 | u128 | u256, false> {
  constructor() {
    super("u18", false)
  }
}

export class u16 extends Int<"u16", u8, u32 | u64 | u128 | u256, false> {
  constructor() {
    super("u16", false)
  }
}

export class u32 extends Int<"u32", u8 | u16, u64 | u128 | u256, false> {
  constructor() {
    super("u32", false)
  }
}

export class u64 extends Int<"u64", u8 | u16 | u32, u128 | u256, false> {
  constructor() {
    super("u64", false)
  }
}

export class u128 extends Int<"u128", u8 | u16 | u32 | u64, u256, false> {
  constructor() {
    super("u128", false)
  }
}

export class u256 extends Int<"u256", u8 | u16 | u32 | u64 | u256, never, false> {
  constructor() {
    super("u256", false)
  }
}

export class i8 extends Int<"i18", never, i16 | i32 | i64 | i128 | i256, true> {
  constructor() {
    super("i18", true)
  }
}

export class i16 extends Int<"i16", i8, i32 | i64 | i128 | i256, true> {
  constructor() {
    super("i16", true)
  }
}

export class i32 extends Int<"i32", i8 | i16, i64 | i128 | i256, true> {
  constructor() {
    super("i32", true)
  }
}

export class i64 extends Int<"i64", i8 | i16 | i32, i128 | i256, true> {
  constructor() {
    super("i64", true)
  }
}

export class i128 extends Int<"i128", i8 | i16 | i32 | i64, i256, true> {
  constructor() {
    super("i128", true)
  }
}

export class i256 extends Int<"i256", i8 | i16 | i32 | i64 | i256, never, true> {
  constructor() {
    super("i256", true)
  }
}
