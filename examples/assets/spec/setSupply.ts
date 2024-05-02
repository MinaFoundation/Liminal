import * as L from "liminal"
import { TokenId } from "./common.js"

export class SetSupplyProps extends L.struct({
  token: TokenId,
  supply: L.u64,
}) {}

export class SetSupplyError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class SetSupplyResult extends L.Result(L.u64, SetSupplyError) {}

export const SetSupply = L.f(function*(input: SetSupplyProps) {
  return SetSupplyResult.from("Ok", new L.u64(1))
})
