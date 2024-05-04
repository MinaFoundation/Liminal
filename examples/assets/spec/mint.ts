import * as L from "liminal"
import { TokenId } from "./common.js"

export interface MintProps {
  token: TokenId
  to: L.id
  amount: L.u64
}

export class MintError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class MintResult extends L.Union("Ok", MintError) {}

export const mint = L.f(function*(props: MintProps) {
  return MintResult.from("Ok")
})
