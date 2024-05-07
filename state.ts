import { Constructor, Type } from "./Type.js"

export function State<T extends Type>(ctor: Constructor<T>): T {
  return new ctor()
}

export function set<T extends Type>(type: T, value: T): Generator<never, T> {
  throw 0
}
