import { BinaryOperationSource, CompareSource, ConstructorSource, TypeSource } from "../Source.js"
import { Type } from "../Type/Type.js"

export class Min<T extends Type> extends ConstructorSource("Min")<T> {}

export class Max<T extends Type> extends ConstructorSource("Max")<T> {}

export class Add<T extends Type> extends BinaryOperationSource("Add")<T> {}

export class Subtract<T extends Type> extends BinaryOperationSource("Subtract")<T> {}

export class Multiply<T extends Type> extends BinaryOperationSource("Multiply")<T> {}

export class Divide<T extends Type> extends BinaryOperationSource("Divide")<T> {}

export class Square<T extends Type> extends TypeSource("Square")<T> {}

export class Logarithm<T extends Type> extends BinaryOperationSource("Logarithm")<T> {}

export class Gt<T extends Type> extends CompareSource("Gt")<T> {}

export class Gte<T extends Type> extends CompareSource("Gte")<T> {}

export class Lt<T extends Type> extends CompareSource("Lt")<T> {}

export class Lte<T extends Type> extends CompareSource("Lte")<T> {}
