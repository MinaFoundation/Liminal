import { Flatten } from "../util/Flatten.ts"
import { Tagged } from "../util/Tagged.ts"
import { U2I } from "../util/U2I.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Yield } from "./Branch.ts"
import { Fields, FieldTypes } from "./Struct.ts"
import { Type } from "./Type.ts"

export function use<F extends FieldTypes>(
  _fields: F,
): Generator<Use<Flatten<Fields<F>>>, Flatten<Fields<F>>> {
  unimplemented()
}

export class Use<F extends Fields = any> extends Type.make("Dependencies")<UseSource> {
  constructor(readonly fields: F) {
    super(new UseSource())
  }
}

export class UseSource extends Tagged("UseSource") {}

export type ExtractUse<Y extends Yield> = Extract<Y, Use> extends Use<infer D> ? Flatten<U2I<D>>
  : never
