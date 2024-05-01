import { Globals } from "./Globals.js"
import { Any } from "./type.js"

export interface method<
  I extends Any = Any,
  Y extends Any = Any,
  O extends Any = Any,
> extends ReturnType<typeof method<I, Y, O>> {}
export function method<
  I extends Any,
  Y extends Any,
  O extends Any,
>(
  input: I,
  event: Y,
  output: O,
  impl: (
    this: Globals,
    input: InstanceType<I>,
  ) => Generator<InstanceType<Y>, InstanceType<O>>,
) {
  return { input, event, output, impl }
}
