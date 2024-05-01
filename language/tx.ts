import { Globals } from "./Globals.js"
import { Any } from "./type.js"

export interface tx<
  I extends Any = Any,
  Y extends Any = Any,
  O extends Any = Any,
> extends ReturnType<typeof tx<I, Y, O>> {}
export function tx<I extends Any, Y, O>(
  propsType: I,
  impl: (
    this: Globals,
    input: InstanceType<I>,
  ) => Generator<Y, O>,
) {
  return { propsType, impl }
}
