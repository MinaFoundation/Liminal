import * as L from "liminal"
import { TokenId } from "./common.js"

export interface BurnProps {
  token: TokenId
  from: L.id
  amount: L.u64
}

export class BurnError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class BurnResult extends L.union("Ok", BurnError) {}

export const burn = L.f(function*(value: BurnProps) {
  yield "HELLO" as const
  return BurnResult.from("Ok")
})

interface Ty<T, M> {
  "": {
    native: T
    metadata: M
  }
  (value: T): Val<T, M>
}

interface Val<T, M> {
  "": {
    ty: Ty<T, M>
  }
  value: T | Val<T, M>
  assertEquals<E extends L.Variant>(
    expect: Val<T, M>,
    error: E,
  ): L.Effect<L.AssertionError<T>, void>
}
