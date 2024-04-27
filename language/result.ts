import { enum_ } from "./enum.js"
import { top } from "./type.js"

export function result<T extends top, E extends top>(
  Value: T,
  Error: E,
) {
  return class extends enum_({ Value, Error }) {}
}
