import { top } from "./type.js"

export class Method<
  I extends top = top,
  Y extends top = top,
  O extends top = top,
> {
  constructor(
    readonly input: I,
    readonly event: Y,
    readonly output: O,
  ) {}
}
