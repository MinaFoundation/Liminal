import * as L from "liminal"
import { TokenId } from "./common.js"

export interface TransferProps {
  token: TokenId
  from: L.id
  to: L.id
  amount: L.u64
}

export class TransferError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class TransferResult extends L.Union("Ok", TransferError) {}

export class TransferEvent extends L.Union("Initiated", "Error", "Result") {}

export const transfer = L.f(function*({ token, from, to, amount }: TransferProps) {
  // this.contract // TODO
  return TransferResult.from("Ok")
})
