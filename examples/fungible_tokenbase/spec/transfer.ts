import * as L from "liminal"
import { TokenId } from "./common.js"

export class TransferProps extends L.struct({
  token: TokenId,
  from: L.id,
  to: L.id,
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

export class TransferEvent extends L.enum({
  Initiated: TransferProps,
  Error: TransferError,
  Result: TransferResult,
}) {}

export const Transfer = L.method(
  TransferProps,
  TransferEvent,
  TransferResult,
  function*(input) {
    return new TransferResult({ tag: "Ok" })
  },
)
