import * as L from "liminal"
import { TokenId } from "./common.js"

export class FreezeProps extends L.struct({
  token: TokenId,
  who: L.id,
}) {}

export class FreezeError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class FreezeResult extends L.Result(null!, FreezeError) {}

export const Freeze = L.f(function*(input: FreezeProps) {
  return FreezeResult.from("Ok")
})
