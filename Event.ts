import { Effect } from "./Effect.js"
import { Type } from "./Type.js"

export function event<N extends string, T extends Type>(): Effect<Event<N, T>, void> {
  throw 0
}

export class Event<N extends string, T extends Type> {
  constructor(readonly name: N, readonly value: T) {}
}
