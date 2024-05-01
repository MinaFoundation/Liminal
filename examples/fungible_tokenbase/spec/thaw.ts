import * as L from "liminal"
import { TokenId } from "./common.js"

export class ThawProps extends L.struct({
  token: TokenId,
  who: L.id,
}) {}

export class ThawError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class ThawResult extends L.ResultType(
  null!,
  ThawError,
) {}

export const thaw = L.method(
  ThawProps,
  null!,
  ThawResult,
  function*(input) {
    return new ThawResult({ tag: "Ok" })
  },
)
