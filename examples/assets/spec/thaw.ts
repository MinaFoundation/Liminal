import * as L from "liminal"
import { TokenId } from "./common.js"

export interface ThawProps {
  token: TokenId
  who: L.id
}

export class ThawError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class ThawResult extends L.Union("Ok", ThawError) {}

export const thaw = L.f(function*({}: ThawProps) {
  return ThawResult.from("Ok")
})
