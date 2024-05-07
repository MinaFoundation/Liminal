import { type } from "./Type.js"

export interface constant<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof constant<K>>>
{}

export function constant<K extends keyof any>(key: K) {
  return type("constant", { key })<K>
}
