import { Source, Source, Type } from "./Type.js"

class Int<K extends string = any, From = any, Into extends Type = any, S extends boolean = any>
  extends Type<K, number, {}, From, Into>
{
  static min<T extends Int, A extends unknown[]>(
    this: new(...args: A) => T,
    ...args: A
  ): T {
    return new this(...args).intSource("min", {})
  }

  static max<T extends Int, A extends unknown[]>(
    this: new(...args: A) => T,
    ...args: A
  ): T {
    return new this(...args).intSource("max", {})
  }

  constructor(name: K, signed: S) {
    super(name, { signed })
  }

  add(value: this) {
    return this.intSource("add", { value })
  }

  subtract(value: this) {
    return this.intSource("subtract", { value })
  }

  multiply(value: this) {
    return this.intSource("multiply", { value })
  }

  divide(value: this) {
    return this.intSource("divide", { value })
  }

  square() {
    return this.intSource("square", {})
  }

  intSource = Source<IntSource>()
}

export type IntSource =
  | Source<"add" | "subtract" | "multiply" | "divide" | "logarithm", { value: Type }>
  | Source<"square", {}>
  | Source<"min", {}>
  | Source<"max", {}>

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
