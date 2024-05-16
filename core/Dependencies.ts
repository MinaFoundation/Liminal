import { Flatten } from "../util/Flatten.ts"
import { Tagged } from "../util/Tagged.ts"
import { U2I } from "../util/U2I.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Yield } from "./CommandLike.ts"
import { Fields, FieldTypes } from "./Struct.ts"
import { Type } from "./Type.ts"

export function use<F extends FieldTypes>(
  _fields: F,
): Generator<Dependencies<Flatten<Fields<F>>>, Fields<F>> {
  unimplemented()
}

export class Dependencies<F extends Fields = any>
  extends Type.make("Dependencies")<DependenciesSource, never>
{
  constructor(readonly fields: F) {
    super(new DependenciesSource())
  }
}

export class DependenciesSource extends Tagged("Dependencies") {}

export type ExtractDependencies<Y extends Yield> = Extract<Y, Dependencies> extends
  Dependencies<infer D> ? Flatten<U2I<D>> : never
