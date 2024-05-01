import { Globals } from "./Globals.js"
import { Any } from "./type.js"

export interface tx<
  I extends Any = Any,
  Y extends Any = Any,
  O extends Any = Any,
> extends ReturnType<typeof tx<I, Y, O>> {}
export function tx<
  I extends Any,
  Y extends Any,
  O extends Any,
>(
  props: I,
  impl: (
    this: Globals,
    input: InstanceType<I>,
  ) => Generator<InstanceType<Y>, InstanceType<O>>,
) {
  return { props, impl }
}
