import { Type, type } from "./Type.js"

export interface Err<K extends keyof any = any, Props extends Type = any>
  extends InstanceType<ReturnType<typeof Err<K, Props>>>
{}
export function Err<K extends keyof any, Props extends Type | undefined = undefined>(
  tag: K,
  props: Props = undefined!,
) {
  return type("Err", { tag, props })<LiminalError<K, Props>>
}

export class LiminalError<K extends keyof any, Props> {
  constructor(readonly key: K, readonly props: Props) {}
}
