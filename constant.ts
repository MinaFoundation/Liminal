import { Type } from "./Type.js"

export interface constant<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof constant<K>>>
{}

export function constant<K extends keyof any>(key: K) {
  return Type.new("constant", { key })<K>
}
