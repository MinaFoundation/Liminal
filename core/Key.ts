import { Value } from "./Value.ts"

export interface Key<T extends keyof any> extends InstanceType<ReturnType<typeof Key<T>>> {}

export function Key<T extends keyof any>(value: T) {
  return class Key extends Value.make("Key")<never, T> {
    value = value
  }
}
