import * as L from "liminal"
import { TokenId } from "./common.js"

export interface SetAdminProps {
  token: TokenId
  admin: L.signer
}

export class SetAdminError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class SetAdminResult extends L.Union(L.id, SetAdminError) {}

/** Testing if docs work */
export const setAdmin = L.f(function*(input: SetAdminProps) {
  return SetAdminResult.from(L.id.from(new Uint8Array()))
})
