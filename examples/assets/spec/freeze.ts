import * as L from "liminal"
import { TokenId } from "./common.js"

export interface FreezeProps {
  token: TokenId
  who: L.id
}

export class FreezeError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class FreezeResult extends L.union("Ok", FreezeError) {}

export const freeze = L.f(function*(input: FreezeProps) {
  return FreezeResult.from("Ok")
})
