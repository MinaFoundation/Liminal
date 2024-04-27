import { top } from "./type.js"

export interface Method<I extends top = top, O extends top = top> {
  input: I
  output: O
}
export function method<I extends top, O extends top>(input: I, output: O) {
  return {
    input,
    output,
  }
}
