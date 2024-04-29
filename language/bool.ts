import { Catch, enum_ } from "./enum.js"
import { top, Type } from "./type.js"

export class True extends Type("true", {})<true> {}
export class False extends Type("false", {})<false> {}

export class bool extends enum_({ True, False }) {
  static from(value: boolean): bool {
    return new bool({
      tag: value ? "True" : "False",
      value: value as never,
    })
  }
  declare assert: <E extends InstanceType<top>>(error: E) => Generator<Catch<E>, true, unknown>
}

export { true_ as true }
const true_ = new bool({ tag: "True", value: true })

export { false_ as false }
const false_ = new bool({ tag: "False", value: false })
