import { u8 } from "./int.js"
import { AnyType, Instance, Type } from "./Type.js"

export interface AssertError<E extends AnyType>
  extends ty<"AssertError", number, { error: E }, AssertErrorInstance<E>, never>
{}
export function AssertError<E extends AnyType>(error: E): AssertError<E> {
  return Type("AssertError", { error }, AssertErrorInstance)
}

export class AssertErrorInstance<T extends AnyType> extends Instance<T> {
  someMethod() {
    return this
  }
}
