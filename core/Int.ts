import { bool } from "./Bool.ts"
import { BinaryTypeNode, CompareNode, ConstructorNode, TypeNode } from "./Node.ts"
import { Type } from "./Type.ts"

// TODO: bit manipulation, floats, floor/ceil, power ...

export type SignedInt = i8 | i16 | i32 | i64 | i256
export type UnsignedInt = u8 | u16 | u32 | u64 | u256

// TODO: allow from/into from opposite-signed types (effectively enabling an `absolute` method)
export class u8 extends Int(false, 8)<never, u16 | u32 | u64 | u128 | u256> {}
export class u16 extends Int(false, 16)<u8, u32 | u64 | u128 | u256> {}
export class u32 extends Int(false, 32)<u8 | u16, u64 | u128 | u256> {}
export class u64 extends Int(false, 64)<u8 | u16 | u32, u128 | u256> {}
export class u128 extends Int(false, 128)<u8 | u16 | u32 | u64, u256> {}
export class u256 extends Int(false, 256)<u8 | u16 | u32 | u64 | u128, never> {}
export class i8 extends Int(true, 8)<never, i16 | i32 | i64 | i128 | i256> {}
export class i16 extends Int(true, 16)<i8, i32 | i64 | i128 | i256> {}
export class i32 extends Int(true, 32)<i8 | i16, i64 | i128 | i256> {}
export class i64 extends Int(true, 64)<i8 | i16 | i32, i128 | i256> {}
export class i128 extends Int(true, 128)<i8 | i16 | i32 | i64, i256> {}
export class i256 extends Int(true, 256)<i8 | i16 | i32 | i64 | i256, never> {}

export type IntSize = 8 | 16 | 32 | 64 | 128 | 256

function Int<Signed extends boolean, Size extends IntSize>(signed: Signed, size: Size) {
  return class<From extends Type, Into extends Type>
    extends Type.make(`${signed ? "i" : "u"}${size}`, { signed })<number, number | From, Into>
  {
    static min<This extends new() => Type>(this: This) {
      return new IntNode.MinNode(this).instance()
    }

    static max<This extends new() => Type>(this: This) {
      return new IntNode.MaxNode(u16).instance()
    }

    static random<This extends new() => Type>(this: This) {
      return new IntNode.RandomNode(this).instance()
    }

    add(value: this): this {
      return new IntNode.AddNode(this, value).instance()
    }

    subtract(value: this): this {
      return new IntNode.SubtractNode(this, value).instance()
    }

    multiply(value: this): this {
      return new IntNode.MultiplyNode(this, value).instance()
    }

    divide(value: this): this {
      return new IntNode.DivideNode(this, value).instance()
    }

    square(): this {
      return new IntNode.SquareNode(this).instance()
    }

    logarithm(value: this): this {
      return new IntNode.LogarithmNode(this, value).instance()
    }

    gt(value: this): bool {
      return new IntNode.GtNode(this, value).instance()
    }

    gte(value: this): bool {
      return new IntNode.GteNode(this, value).instance()
    }

    lt(value: this): bool {
      return new IntNode.LtNode(this, value).instance()
    }

    lte(value: this): bool {
      return new IntNode.LteNode(this, value).instance()
    }
  }
}

export namespace IntNode {
  export class RandomNode<T extends Type = any> extends ConstructorNode("Random")<T> {}

  export class MinNode<T extends Type = any> extends ConstructorNode("Min")<T> {}

  export class MaxNode<T extends Type = any> extends ConstructorNode("Max")<T> {}

  export class AddNode<T extends Type = any> extends BinaryTypeNode("Add")<T> {}

  export class SubtractNode<T extends Type = any> extends BinaryTypeNode("Subtract")<T> {}

  export class MultiplyNode<T extends Type = any> extends BinaryTypeNode("Multiply")<T> {}

  export class DivideNode<T extends Type = any> extends BinaryTypeNode("Divide")<T> {}

  export class SquareNode<T extends Type = any> extends TypeNode("Square")<T> {}

  export class LogarithmNode<T extends Type = any> extends BinaryTypeNode("Logarithm")<T> {}

  export class GtNode<T extends Type = any> extends CompareNode("Gt")<T> {}

  export class GteNode<T extends Type = any> extends CompareNode("Gte")<T> {}

  export class LtNode<T extends Type = any> extends CompareNode("Lt")<T> {}

  export class LteNode<T extends Type = any> extends CompareNode("Lte")<T> {}
}
