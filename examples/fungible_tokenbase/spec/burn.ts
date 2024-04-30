import * as L from "liminal"
import { TokenId } from "./common.js"

export class BurnProps extends L.struct({
  token: TokenId,
  from: L.pk,
  amount: L.u64,
}) {}

export class BurnError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class BurnResult extends L.ResultType(
  null!,
  BurnError,
) {}

export const burn = L.method(
  BurnProps,
  null!,
  BurnResult,
)
