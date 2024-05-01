import { enum_ } from "../enum.js"
import { Any } from "../type.js"

export interface ResultType<T extends Any, E extends Any>
  extends ReturnType<typeof ResultType<T, E>>
{}
export function ResultType<T extends Any, E extends Any>(
  Ok: T,
  Error: E,
) {
  return class extends enum_({ Ok, Error }) {
    // TODO: ok, err
  }
}

export interface Result<T extends Any, E extends Any> extends InstanceType<ResultType<T, E>> {}
