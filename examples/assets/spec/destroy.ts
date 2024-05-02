import * as L from "liminal"
import { TokenId } from "./common.js"

export interface DestroyProps {
  token: TokenId
}

export class DestroyError extends L.union("NotAdmin", "NoSuchTokenId") {}

export class DestroyResult extends L.union("Ok", DestroyError) {}

export const destroy = L.f(function*(input: DestroyProps) {
  throw 0
})
