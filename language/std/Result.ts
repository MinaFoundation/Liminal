import { enum_ } from "../enum.js"
import { top } from "../type.js"

export type Result<T extends top, E extends top> = ReturnType<typeof Result<T, E>>
export function Result<T extends top, E extends top>(
  Value: T,
  Error: E,
) {
  return class extends enum_({ Value, Error }) {}
}
