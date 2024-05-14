import { CommandLike } from "../core/CommandLike.ts"
import { unimplemented } from "../util/unimplemented.ts"

export function parse(root: CommandLike) {
  let root_: Generator<unknown, unknown>
  if (typeof root === "function") {
    root_ = root()
  } else if (Symbol.iterator in root) {
    root_ = root
  } else {
    return unimplemented()
  }
  const statements: unknown[] = []
  statements: while (true) {
    const result = root_.next()
    if (result.done) {
      statements.push(result.value)
      break statements
    } else {
      statements.push(result.value)
    }
  }
  return statements
}
