import { Type, TypeConstructor } from "./Type.js"

export interface state<T extends Type = Type> extends Generator<never, T> {
  tag: "state"
  type: T
  set(value: T): SetState<T>
}
export declare function state<T extends TypeConstructor>(type: T): state<InstanceType<T>>

export interface SetState<T extends Type> extends Generator<T, T> {
  tag: "SetState"
}
