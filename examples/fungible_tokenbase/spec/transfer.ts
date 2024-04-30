import * as L from "liminal"
import { TokenId } from "./common.js"

export class TransferProps extends L.struct({
  token: TokenId,
  from: L.pk,
  to: L.pk,
  amount: L.u64,
}) {}

export class TransferError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class TransferResult extends L.ResultType(
  null!,
  TransferError,
) {}

export const transfer = L.method(
  TransferProps,
  null!,
  TransferResult,
)
