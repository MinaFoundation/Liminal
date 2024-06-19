import { u256 } from "../core/mod.ts"

export class U256Counter extends u256.default(0) {
  *next(this: u256) {
    return yield* this.assign(this.add(1))
  }
}
