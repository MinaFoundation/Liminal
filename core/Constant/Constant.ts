import { Type } from "../Type/Type.js"

export interface constant<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof constant<K>>>
{}

export function constant<K extends keyof any>(value: K) {
  return Type.make("constant", { value })<K>
}
