import { Tagged } from "../util/Tagged.ts"
import type { bool } from "./Bool.ts"
import type { List } from "./List.ts"
import type { Mapping } from "./Mapping.ts"
import { Factory, Type } from "./Type.ts"

// TODO: bit manipulation, floats, floor/ceil, power ...

export type Int = SignedInt | UnsignedInt
export type SignedInt = i8 | i16 | i32 | i64 | i256
export type UnsignedInt = u8 | u16 | u32 | u64 | u256

// TODO: allow from/into from opposite-signed types (effectively enabling an `absolute` method)
export class u8 extends Int(false, 8)<u8, u16 | u32 | u64 | u128 | u256> {}
export class u16 extends Int(false, 16)<u8 | u16, u32 | u64 | u128 | u256> {}
export class u32 extends Int(false, 32)<u8 | u16 | u32, u64 | u128 | u256> {}
export class u64 extends Int(false, 64)<u8 | u16 | u32 | u64, u128 | u256> {}
export class u128 extends Int(false, 128)<u8 | u16 | u32 | u64 | u128, u256> {}
export class u256 extends Int(false, 256)<u8 | u16 | u32 | u64 | u128 | u256, never, U256Source> {}

export class i8 extends Int(true, 8)<i8, i16 | i32 | i64 | i128 | i256> {}
export class i16 extends Int(true, 16)<i8 | i16, i32 | i64 | i128 | i256> {}
export class i32 extends Int(true, 32)<i8 | i16 | i32, i64 | i128 | i256> {}
export class i64 extends Int(true, 64)<i8 | i16 | i32 | i64, i128 | i256> {}
export class i128 extends Int(true, 128)<i8 | i16 | i32 | i64 | i128, i256> {}
export class i256 extends Int(true, 256)<i8 | i16 | i32 | i64 | i128 | i256, never> {}

export type IntSize = 8 | 16 | 32 | 64 | 128 | 256

function Int<Signed extends boolean, Size extends IntSize>(signed: Signed, size: Size) {
  return class<From extends Type, Into extends Type, ExtraSource = never>
    extends Type.make(`${signed ? "i" : "u"}${size}`)<
      IntSource | ExtraSource,
      number,
      number | From,
      Into
    >
  {
    signed = signed

    static min<This extends Factory>(this: This) {
      return new this(new IntSource.Min())
    }

    static max<This extends Factory>(this: This) {
      return new this(new IntSource.Max())
    }

    static random<This extends Factory>(this: This) {
      return new this(new IntSource.Random())
    }

    add(value: this): this {
      return new this.ctor(new IntSource.Add(this, value))
    }

    subtract(value: this): this {
      return new this.ctor(new IntSource.Subtract(this, value))
    }

    multiply(value: this): this {
      return new this.ctor(new IntSource.Multiply(this, value))
    }

    divide(value: this): this {
      return new this.ctor(new IntSource.Divide(this, value))
    }

    square(this: this): this {
      return new this.ctor(new IntSource.Square(this))
    }

    logarithm(value: this): this {
      return new this.ctor(new IntSource.Logarithm(this, value))
    }

    gt(value: this): bool {
      return new this.ctor(new IntSource.Gt(this, value)) as never
    }

    gte(value: this): bool {
      return new this.ctor(new IntSource.Gte(this, value)) as never
    }

    lt(value: this): bool {
      return new this.ctor(new IntSource.Lt(this, value)) as never
    }

    lte(value: this): bool {
      return new this.ctor(new IntSource.Lte(this, value)) as never
    }
  }
}

export type IntSource =
  | IntSource.Random
  | IntSource.Min
  | IntSource.Max
  | IntSource.Add
  | IntSource.Subtract
  | IntSource.Multiply
  | IntSource.Divide
  | IntSource.Square
  | IntSource.Logarithm
  | IntSource.Gt
  | IntSource.Gte
  | IntSource.Lt
  | IntSource.Lte
export namespace IntSource {
  export class Random extends Tagged("Random") {}
  export class Min extends Tagged("Min") {}
  export class Max extends Tagged("Max") {}
  export class Add extends Tagged("Add") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Subtract extends Tagged("Subtract") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Multiply extends Tagged("Multiply") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Divide extends Tagged("Divide") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Square extends Tagged("Square") {
    constructor(readonly self: Type) {
      super()
    }
  }
  export class Logarithm extends Tagged("Logarithm") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Gt extends Tagged("Gt") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Gte extends Tagged("Gte") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Lt extends Tagged("Lt") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
  export class Lte extends Tagged("Lte") {
    constructor(readonly left: Type, readonly right: Type) {
      super()
    }
  }
}

export type U256Source = U256Source.MappingSize | U256Source.ListSize
export namespace U256Source {
  export class MappingSize extends Tagged("MappingSize") {
    constructor(readonly self: Mapping) {
      super()
    }
  }
  export class ListSize extends Tagged("ListSize") {
    constructor(readonly self: List) {
      super()
    }
  }
}
