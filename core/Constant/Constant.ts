import { Type } from "../Type/Type.js"

interface constant<K extends keyof any = any>
  extends InstanceType<ReturnType<typeof constant<K>>>
{}

constant.name = "const"
function constant<K extends keyof any>(value: K) {
  return Type.make("constant", { value })<K>
}

export { constant as const }
