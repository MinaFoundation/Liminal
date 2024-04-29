import { top, Type } from "./type.js"

export class bool extends Type("bool", {})<boolean> {
  declare match: <O>(arms: {
    True: () => Generator<any, any, any>
    False: () => Generator<any, any, any>
  }) => O

  declare assert: <E extends InstanceType<top>>(error: E) => E
}
