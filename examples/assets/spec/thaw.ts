import * as L from "liminal"
import { TokenId } from "./common.js"

export class ThawProps extends L.struct({
  token: TokenId,
  who: L.id,
}) {}

export class ThawError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class ThawResult extends L.Result(null!, ThawError) {}

export const thaw = L.f(function*(input: ThawProps) {
  return ThawResult.from("Ok")
})
