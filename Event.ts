import { Effect } from "./Effect.js"

export class Event<N extends string, T> extends Effect("Event")<void, T> {
  constructor(readonly name: N, readonly value: T) {
    super()
  }
}
