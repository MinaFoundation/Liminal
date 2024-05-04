import * as L from "liminal"
import { TokenId } from "./common.js"

export interface DestroyProps {
  token: TokenId
}

export class DestroyError extends L.Union("NotAdmin", "NoSuchTokenId") {}

export class DestroyResult extends L.Union("Ok", DestroyError) {}

export const destroy = L.f(function*(input: DestroyProps) {
  throw 0
})
