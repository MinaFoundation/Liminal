import * as L from "liminal"
import { TokenId } from "./common.js"

export interface BurnProps {
  token: TokenId
  from: L.id
  amount: L.u64
}

export class BurnError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class BurnResult extends L.union("Ok", BurnError) {}

export const burn = L.f(function*(value: BurnProps) {
  return BurnResult.from("Ok")
})
