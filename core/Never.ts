import { Value } from "./Value.ts"

export class Never extends Value.make("Never")<never, undefined> {
  stack = new Error().stack
}
