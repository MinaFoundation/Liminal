import * as L from "liminal"
import { TokenId } from "./common.js"

export interface BurnProps {
  token: TokenId
  from: L.id
  amount: L.u64
}

export class BurnError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class BurnResult extends L.Union("Ok", BurnError) {}

export const burn = L.f(function*(value: BurnProps) {
  yield "HELLO" as const
  return BurnResult.from("Ok")
})
