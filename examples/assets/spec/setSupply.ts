import * as L from "liminal"
import { TokenId } from "./common.js"

export interface SetSupplyProps {
  token: TokenId
  supply: L.u64
}

export class SetSupplyError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class SetSupplyResult extends L.Union(L.u64, SetSupplyError) {}

export const setSupply = L.f(function*({}: SetSupplyProps) {
  return SetSupplyResult.from(L.u64.lift(1))
})
