import * as L from "liminal"
import { TokenId } from "./common.js"

export interface TransferProps {
  token: TokenId
  from: L.id
  to: L.id
  amount: L.u64
}

export class TransferError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class TransferResult extends L.union("Ok", TransferError) {}

export class TransferEvent extends L.union("Initiated", "Error", "Result") {}

export const transfer = L.f(function*({ token, from, to, amount }: TransferProps) {
  return TransferResult.from("Ok")
})
