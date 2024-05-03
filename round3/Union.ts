import { Native, Type } from "./Type.js"

export function Union<M extends (new() => Type)[]>(...memberTypes: M) {
  return class extends Type<
    "Union",
    Native<InstanceType<M[number]>>,
    { memberTypes: M },
    InstanceType<M[number]>,
    never
  > {
    constructor() {
      super("Union", { memberTypes })
    }
  }
}
