import * as L from "liminal"
import { TokenId } from "./common.js"

export class MintProps extends L.struct({
  token: TokenId,
  to: L.pk,
  amount: L.u64,
}) {}

export class MintError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class MintResult extends L.ResultType(
  null!,
  MintError,
) {}

export const mint = L.method(
  MintProps,
  null!,
  MintResult,
)
