import { Effect } from "../Effect/Effect.js"
import { Constructor, Type } from "../Type/Type.js"
import { SetStateNode, StateNode } from "./StateNode.js"

export type State<T extends Type = any> = T & { [State.key]?: true }
export function State<T extends Type>(type: Constructor<T>): State<T> {
  return new StateNode(type).instance()
}
export namespace State {
  export const key = Symbol()
}

export function setState<T extends Type>(state: State<T>, value: T): Effect<never, T> {
  return new SetStateNode(state, value).instance()
}
