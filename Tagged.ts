import { Type } from "./Type.js"

export interface Tagged<K extends keyof any = any> extends ReturnType<typeof Tagged<K>> {}
export function Tagged<K extends keyof any>(tag: K) {
  return Type.new("Tagged", { tag })<{ tag: K }>
}
