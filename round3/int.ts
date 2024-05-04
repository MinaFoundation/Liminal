import { state } from "./state.js"
import { Type } from "./Type.js"

class Int<K extends string, From, Into extends Type, S extends boolean>
  extends Type<K, number, {}, From, Into>
{
  constructor(name: K, signed: S) {
    super(name, { signed })
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

export class u8 extends Int<"u18", never, u16 | u32 | u64 | u128 | u256 | state<typeof u8>, false> {
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
