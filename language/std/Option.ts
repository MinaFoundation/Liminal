import { enum_ } from "../enum.js"
import { top } from "../type.js"

export type Option<S extends top> = ReturnType<typeof Option<S>>
export function Option<S extends top>(Some: S) {
  return class extends enum_({
    Some,
    None: null!,
  }) {
    unwrapOr(orValue: InstanceType<S>) {
      return this.match({
        Some(value) {
          return value
        },
        None() {
          return orValue
        },
      })
    }
  }
}
