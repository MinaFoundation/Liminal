import { u256 } from "../core/mod.ts"

export class Counter extends u256 {
  *next(this: u256) {
    return yield* this.assign(this.add(1))
  }
}
