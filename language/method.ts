import { Any } from "./type.js"

export class Method<I extends Any = Any, Y extends Any = Any, O extends Any = Any> {
  constructor(
    readonly input: I,
    readonly event: Y,
    readonly output: O,
  ) {}
}
