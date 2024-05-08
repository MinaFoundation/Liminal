import { Type } from "../Type/Type.js"

export interface constant<T = any> extends InstanceType<ReturnType<typeof constant<T>>> {}

export function constant<T>(value: T) {
  return Type.make("constant", { key: value })<T>
}
