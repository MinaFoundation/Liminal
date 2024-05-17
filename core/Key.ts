import { Type } from "./Type.ts"

export interface Key<T extends keyof any> extends InstanceType<ReturnType<typeof Key<T>>> {}

export function Key<T extends keyof any>(value: T) {
  return class Key extends Type.make("Key")<never, T> {
    value = value
  }
}
