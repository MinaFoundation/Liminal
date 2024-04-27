import { T } from "liminal"

export function result<S, E>(Success: S, Error: E) {
  return T.union({ Success, Error })
    .derive(try_("Success"))
}

declare function try_<B extends string>(branch: B): any
