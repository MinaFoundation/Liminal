import * as L from "liminal"
import { TokenId } from "./common.js"

export class SetAdminProps extends L.struct({
  token: TokenId,
  admin: L.signer,
}) {}

export class SetAdminError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class SetAdminResult extends L.Result(L.id, SetAdminError) {}

export const SetAdmin = L.f(function*(input: SetAdminProps) {
  return SetAdminResult.from("Ok", new Uint8Array())
})
