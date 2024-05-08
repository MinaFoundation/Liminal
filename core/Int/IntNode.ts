import { BinaryTypeNode, CompareNode, ConstructorNode, TypeNode } from "../Node.js"
import { Type } from "../Type/Type.js"

export class Min<T extends Type> extends ConstructorNode("Min")<T> {}

export class Max<T extends Type> extends ConstructorNode("Max")<T> {}

export class Add<T extends Type> extends BinaryTypeNode("Add")<T> {}

export class Subtract<T extends Type> extends BinaryTypeNode("Subtract")<T> {}

export class Multiply<T extends Type> extends BinaryTypeNode("Multiply")<T> {}

export class Divide<T extends Type> extends BinaryTypeNode("Divide")<T> {}

export class Square<T extends Type> extends TypeNode("Square")<T> {}

export class Logarithm<T extends Type> extends BinaryTypeNode("Logarithm")<T> {}

export class Gt<T extends Type> extends CompareNode("Gt")<T> {}

export class Gte<T extends Type> extends CompareNode("Gte")<T> {}

export class Lt<T extends Type> extends CompareNode("Lt")<T> {}

export class Lte<T extends Type> extends CompareNode("Lte")<T> {}
