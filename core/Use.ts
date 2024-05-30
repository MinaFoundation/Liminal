import { Flatten } from "../util/Flatten.ts"
import { Tagged } from "../util/Tagged.ts"
import { U2I } from "../util/U2I.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Yield } from "./Call.ts"
import { State } from "./State.ts"
import { Factory, Type } from "./Type.ts"
import { Union } from "./Union.ts"

export type UseField = Factory | State
export type UseFieldTypes = Record<string, UseField>
export type UseFields<F extends UseFieldTypes = any> = {
  [K in keyof F as F[K] extends State ? never : K]: InstanceType<Exclude<F[K], State>>
}

export function use<F extends UseFieldTypes>(
  _fields: F,
): Generator<
  Use<Flatten<UseFields<F>>>,
  Flatten<
    {
      [K in keyof F]: Union.Unwrap<
        F[K] extends State<infer T> ? T : F[K] extends Factory<infer T> ? T : never
      >
    }
  >
> {
  unimplemented()
}

export class Use<F extends UseFields = any> extends Type.make("Dependencies")<UseSource> {
  constructor(readonly fields: F) {
    super(new UseSource())
  }
}

export class UseSource extends Tagged("UseSource") {}

export type ExtractUse<Y extends Yield> = Extract<Y, Use> extends Use<infer D> ? Flatten<U2I<D>>
  : never
