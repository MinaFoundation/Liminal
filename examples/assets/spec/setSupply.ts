import * as L from "liminal"
import { TokenId } from "./common.js"

export interface SetSupplyProps {
  token: TokenId
  supply: L.u64
}

export class SetSupplyError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class SetSupplyResult extends L.union(L.u64, SetSupplyError) {}

export const setSupply = L.f(function*({}: SetSupplyProps) {
  return SetSupplyResult.from(new L.u64(1))
})