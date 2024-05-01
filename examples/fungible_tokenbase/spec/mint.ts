import * as L from "liminal"
import { TokenId } from "./common.js"

export class MintProps extends L.struct({
  token: TokenId,
  to: L.id,
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

export const Mint = L.method(
  MintProps,
  null!,
  MintResult,
  function*() {
    return new MintResult({ tag: "Ok" })
  },
)
