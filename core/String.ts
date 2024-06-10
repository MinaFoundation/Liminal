import { Value } from "./Value.ts"

export class String extends Value.make("String")<StringSource, string, string> {}

export type StringSource = never
