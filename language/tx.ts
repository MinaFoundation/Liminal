import { Context } from "./Contract.js"

export declare function tx<Y, O>(
  fn: (this: Context) => Generator<Y, O>,
): void // TODO

tx(function*() {
  this.sender
})
