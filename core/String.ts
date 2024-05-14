import { Type } from "./Type.ts"

export class String extends Type.make("String")<StringSource, string, string> {}

export type StringSource = never
