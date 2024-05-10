import { BinaryTypeNode, CompareNode, ConstructorNode, TypeNode } from "../Node.js"
import { Type } from "../Type/Type.js"

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
