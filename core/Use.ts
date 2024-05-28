import { Flatten } from "../util/Flatten.ts"
import { Tagged } from "../util/Tagged.ts"
import { U2I } from "../util/U2I.ts"
import { unimplemented } from "../util/unimplemented.ts"
import { Yield } from "./Call.ts"
import { Factory, Type } from "./Type.ts"

export type UseField = Factory
export type UseFieldTypes = Record<string, UseField>
export type UseFields<F extends UseFieldTypes = any> = { [K in keyof F]: InstanceType<F[K]> }

// TODO: defaults?
export function use<F extends UseFieldTypes>(_fields: F): Generator<
  Use<Flatten<UseFields<F>>>
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
