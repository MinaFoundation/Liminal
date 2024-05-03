import { Type } from "./type.js"

class Int<K extends string, From, Into extends Type> extends Type<K, number, {}, From, Into> {
  constructor(name: K) {
    super(name, {})
  }

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

  square(value: this) {
    return this
  }
}

export class u8 extends Int<"u18", never, u16 | u32 | u64 | u128 | u256> {
  constructor() {
    super("u18")
  }
}

export class u16 extends Int<"u16", u8, u32 | u64 | u128 | u256> {
  constructor() {
    super("u16")
  }
}

export class u32 extends Int<"u32", u8 | u16, u64 | u128 | u256> {
  constructor() {
    super("u32")
  }
}

export class u64 extends Int<"u64", u8 | u16 | u32, u128 | u256> {
  constructor() {
    super("u64")
  }
}

export class u128 extends Int<"u128", u8 | u16 | u32 | u64, u256> {
  constructor() {
    super("u128")
  }
}

export class u256 extends Int<"u256", u8 | u16 | u32 | u64 | u256, never> {
  constructor() {
    super("u256")
  }
}
