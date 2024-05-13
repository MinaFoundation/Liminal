import { bool } from "../Bool/Bool.js"
import { Type } from "../Type/Type.js"
import {
  AddNode,
  DivideNode,
  GteNode,
  GtNode,
  LogarithmNode,
  LteNode,
  LtNode,
  MaxNode,
  MinNode,
  MultiplyNode,
  RandomNode,
  SquareNode,
  SubtractNode,
} from "./IntNode.js"

// TODO: bit manipulation, floats, floor/ceil, power ...

export type SignedInt = i8 | i16 | i32 | i64 | i256
export type UnsignedInt = u8 | u16 | u32 | u64 | u256

export class u8 extends Int(false, 8)<never, u16 | u32 | u64 | u128 | u256> {
  min = new MinNode(u8).instance()
  max = new MaxNode(u8).instance()
}

export class u16 extends Int(false, 16)<u8, u32 | u64 | u128 | u256> {
  min = new MinNode(u16).instance()
  max = new MaxNode(u16).instance()
}

export class u32 extends Int(false, 32)<u8 | u16, u64 | u128 | u256> {
  min = new MinNode(u32).instance()
  max = new MaxNode(u32).instance()
}

export class u64 extends Int(false, 64)<u8 | u16 | u32, u128 | u256> {
  min = new MinNode(u64).instance()
  max = new MaxNode(u64).instance()
}

export class u128 extends Int(false, 128)<u8 | u16 | u32 | u64, u256> {
  min = new MinNode(u128).instance()
  max = new MaxNode(u128).instance()
}

export class u256 extends Int(false, 256)<u8 | u16 | u32 | u64 | u128, never> {
  min = new MinNode(u256).instance()
  max = new MaxNode(u256).instance()
}

export class i8 extends Int(true, 8)<never, i16 | i32 | i64 | i128 | i256> {
  min = new MinNode(i8).instance()
  max = new MaxNode(i8).instance()
}

export class i16 extends Int(true, 16)<i8, i32 | i64 | i128 | i256> {
  min = new MinNode(i16).instance()
  max = new MaxNode(i16).instance()
}

export class i32 extends Int(true, 32)<i8 | i16, i64 | i128 | i256> {
  min = new MinNode(i32).instance()
  max = new MaxNode(i32).instance()
}

export class i64 extends Int(true, 64)<i8 | i16 | i32, i128 | i256> {
  min = new MinNode(i64).instance()
  max = new MaxNode(i64).instance()
}

export class i128 extends Int(true, 128)<i8 | i16 | i32 | i64, i256> {
  min = new MinNode(i128).instance()
  max = new MaxNode(i128).instance()
}

export class i256 extends Int(true, 256)<i8 | i16 | i32 | i64 | i256, never> {
  min = new MinNode(i256).instance()
  max = new MaxNode(i256).instance()
}

export type IntSize = 8 | 16 | 32 | 64 | 128 | 256

function Int<Signed extends boolean, Size extends IntSize>(signed: Signed, size: Size) {
  return class<From extends Type, Into extends Type>
    extends Type.make(`${signed ? "i" : "u"}${size}`, { signed })<number, number | From, Into>
  {
    static random<This extends new() => Type>(this: This) {
      return new RandomNode(this).instance()
    }

    add(value: this): this {
      return new AddNode(this, value).instance()
    }

    subtract(value: this): this {
      return new SubtractNode(this, value).instance()
    }

    multiply(value: this): this {
      return new MultiplyNode(this, value).instance()
    }

    divide(value: this): this {
      return new DivideNode(this, value).instance()
    }

    square(): this {
      return new SquareNode(this).instance()
    }

    logarithm(value: this): this {
      return new LogarithmNode(this, value).instance()
    }

    gt(value: this): bool {
      return new GtNode(this, value).instance()
    }

    gte(value: this): bool {
      return new GteNode(this, value).instance()
    }

    lt(value: this): bool {
      return new LtNode(this, value).instance()
    }

    lte(value: this): bool {
      return new LteNode(this, value).instance()
    }
  }
}
