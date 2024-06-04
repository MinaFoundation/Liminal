import { Type } from "./Type.ts"

export class Never extends Type.make("Never")<never, undefined> {
  stack = new Error().stack
}
