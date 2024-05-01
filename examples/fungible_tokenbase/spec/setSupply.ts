import * as L from "liminal"
import { TokenId } from "./common.js"

export class SetSupplyProps extends L.struct({
  token: TokenId,
  supply: L.u64,
}) {}

export class SetSupplyError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class SetSupplyResult extends L.ResultType(
  L.u64,
  SetSupplyError,
) {}

export const SetSupply = L.method(
  SetSupplyProps,
  null!,
  SetSupplyResult,
  function*(input) {
    return new SetSupplyResult({
      tag: "Ok",
      value: new L.u64(1),
    })
  },
)
