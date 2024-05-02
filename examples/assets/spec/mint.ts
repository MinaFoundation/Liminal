import * as L from "liminal"
import { TokenId } from "./common.js"

export class MintProps extends L.struct({
  token: TokenId,
  to: L.id,
  amount: L.u64,
}) {}

export class MintError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class MintResult extends L.Result(null!, MintError) {}

export const Mint = L.f(function*(props: MintProps) {
  return MintResult.from("Ok")
})
