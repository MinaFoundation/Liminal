import { Contract } from "./Context.js"
import { Any } from "./type.js"

export interface Method<I extends Any = Any, Y extends Any = Any, O extends Any = Any> {
  <C extends Contract>(
    f: (this: C, input: InstanceType<I>) => Generator<InstanceType<Y>, InstanceType<O>>,
  ): (this: C, input: InstanceType<I>) => Generator<InstanceType<Y>, InstanceType<O>>
}
export declare function method<
  I extends Any,
  Y extends Any,
  O extends Any,
>(
  input: I,
  event: Y,
  output: O,
): Method<I, Y, O>
