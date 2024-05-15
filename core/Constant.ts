import { Type } from "./Type.ts"

export interface Constant<T extends keyof any>
  extends InstanceType<ReturnType<typeof Constant<T>>>
{}

export function Constant<T extends keyof any>(value: T) {
  return class extends Type.make("Constant")<ConstantSource, T> {
    value = value

    // protected override inspect(_inspect: Inspect) {
    //   return ({
    //     string: () => `"${value as string}"`,
    //     number: () => value,
    //     symbol: () => value.toString(),
    //   } as Record<string, () => string>)[typeof value]!()
    // }
  }
}

export type ConstantSource = never
