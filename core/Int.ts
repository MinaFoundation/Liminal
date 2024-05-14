import { Tagged } from "../util/Tagged.ts"
import type { bool } from "./Bool.ts"
import type { MerkleList } from "./MerkleList.ts"
import type { MerkleMap } from "./MerkleMap.ts"
import { Factory, Type } from "./Type.ts"

// TODO: bit manipulation, floats, floor/ceil, power ...

export type Int = SignedInt | UnsignedInt
export type SignedInt = i8 | i16 | i32 | i64 | i256
export type UnsignedInt = u8 | u16 | u32 | u64 | u256

// TODO: allow from/into from opposite-signed types (effectively enabling an `absolute` method)
export class u8 extends Int(false, 8)<never, u16 | u32 | u64 | u128 | u256> {}
export class u16 extends Int(false, 16)<u8, u32 | u64 | u128 | u256> {}
export class u32 extends Int(false, 32)<u8 | u16, u64 | u128 | u256> {}
export class u64 extends Int(false, 64)<u8 | u16 | u32, u128 | u256> {}
export class u128 extends Int(false, 128)<u8 | u16 | u32 | u64, u256> {}
export class u256 extends Int(false, 256)<u8 | u16 | u32 | u64 | u128, never, U256Source> {}

export class i8 extends Int(true, 8)<never, i16 | i32 | i64 | i128 | i256> {}
export class i16 extends Int(true, 16)<i8, i32 | i64 | i128 | i256> {}
export class i32 extends Int(true, 32)<i8 | i16, i64 | i128 | i256> {}
export class i64 extends Int(true, 64)<i8 | i16 | i32, i128 | i256> {}
export class i128 extends Int(true, 128)<i8 | i16 | i32 | i64, i256> {}
export class i256 extends Int(true, 256)<i8 | i16 | i32 | i64 | i256, never> {}

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
      return new this.ctor(new IntSource.Add({ left: this, right: value }))
    }

    subtract(value: this): this {
      return new this.ctor(new IntSource.Subtract({ left: this, right: value }))
    }

    multiply(value: this): this {
      return new this.ctor(new IntSource.Multiply({ left: this, right: value }))
    }

    divide(value: this): this {
      return new this.ctor(new IntSource.Divide({ left: this, right: value }))
    }

    square(): this {
      return new this.ctor(new IntSource.Square(this))
    }

    logarithm(value: this): this {
      return new this.ctor(new IntSource.Logarithm({ left: this, right: value }))
    }

    gt(value: this): bool {
      return new this.ctor(new IntSource.Gt({ left: this, right: value }))
    }

    gte(value: this): bool {
      return new this.ctor(new IntSource.Gte({ left: this, right: value }))
    }

    lt(value: this): bool {
      return new this.ctor(new IntSource.Lt({ left: this, right: value }))
    }

    lte(value: this): bool {
      return new this.ctor(new IntSource.Lte({ left: this, right: value }))
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
  export class Add extends Tagged("Add")<{ left: Type; right: Type }> {}
  export class Subtract extends Tagged("Subtract")<{ left: Type; right: Type }> {}
  export class Multiply extends Tagged("Multiply")<{ left: Type; right: Type }> {}
  export class Divide extends Tagged("Divide")<{ left: Type; right: Type }> {}
  export class Square extends Tagged("Square")<Type> {}
  export class Logarithm extends Tagged("Logarithm")<{ left: Type; right: Type }> {}
  export class Gt extends Tagged("Gt")<{ left: Type; right: Type }> {}
  export class Gte extends Tagged("Gte")<{ left: Type; right: Type }> {}
  export class Lt extends Tagged("Lt")<{ left: Type; right: Type }> {}
  export class Lte extends Tagged("Lte")<{ left: Type; right: Type }> {}
}

export type U256Source = U256Source.MerkleMapSize | U256Source.MerkleListSize
export namespace U256Source {
  export class MerkleMapSize extends Tagged("MerkleMapSize")<MerkleMap> {}
  export class MerkleListSize extends Tagged("MerkleMapSize")<MerkleList> {}
}
