import { Tagged } from "../util/Tagged.ts"
import { Value } from "./Value.ts"

export class None extends Value.make("None")<NoneSource, undefined> {}

export type NoneSource = NoneSource.Intrinsic
export namespace NoneSource {
  export class Intrinsic extends Tagged("Default") {}
}

export const none = new None(new NoneSource.Intrinsic())
