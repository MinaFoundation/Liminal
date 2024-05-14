import { Type } from "./Type.ts"

export interface Constant<T extends keyof any>
  extends InstanceType<ReturnType<typeof Constant<T>>>
{}

export function Constant<T extends keyof any>(value: T) {
  return class extends Type.make("Constant")<ConstantSource, T> {
    value = value
  }
}

export type ConstantSource = never
