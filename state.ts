import { Effect } from "./Effect.js"
import { Type } from "./Type.js"

export class State<T extends Type = any> extends Effect<never, T> {
  constructor(readonly type: new() => T) {
    super()
  }

  set(value: T): Effect<never, T> {
    throw 0
  }
}

// import { Effect } from "./Effect.js"
// import { Constructor, Type } from "./Type.js"

// export type State<T extends Type = any> = T & {
//   set(value: T): Effect<never, T>
// }
// export function State<T extends Type>(ctor: Constructor<T>): State<T> {
//   throw 0
//   // const instance = new ctor()
// }
