import { unimplemented } from "../util/unimplemented.ts"
import { Result } from "./Call.ts"
import { EffectStatements, EffectType } from "./F.ts"
import { id } from "./Id.ts"
import { Value } from "./Value.ts"
import { Vk } from "./Vk.ts"

export function Authority<
  P extends Value.PropTypes,
  Y extends Value,
>(
  propsTypes: Value.Props<P>,
  statements: EffectStatements<id, [resolved: Value.PropsResolved<P>], Y, Vk>,
) {
  return class extends id {
    propsTypes = propsTypes
    statements = statements

    permit<
      P extends Value.PropTypes,
      T,
      Y extends Value,
      R extends Result,
    >(_f: InstanceType<EffectType<P, T, Y, R>>): InstanceType<EffectType<P, T, Y, R>> {
      unimplemented()
    }
  }
}
