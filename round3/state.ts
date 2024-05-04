import { Type } from "./Type.js"

export interface state<T extends Type> {
  tag: "state"
  type: T
}
export declare function state<T extends Type>(type: new(...args: any) => T): state<T>
