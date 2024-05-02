import * as L from "liminal"
import { TokenId } from "./common.js"

export class BurnProps extends L.struct({
  token: TokenId,
  from: L.id,
  amount: L.u64,
}) {}

export class BurnError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class BurnResult extends L.Result(null!, BurnError) {}

export const burn = L.f(function*(value: BurnProps) {
  return BurnResult.from("Ok")
})
