import * as L from "liminal"
import { TokenId } from "./common.js"

export class SetAdminProps extends L.struct({
  token: TokenId,
  admin: L.signer,
}) {}

export class SetAdminError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class SetAdminResult extends L.ResultType(
  L.id,
  SetAdminError,
) {}

export const SetAdmin = L.method(
  SetAdminProps,
  null!,
  SetAdminResult,
  function*(input) {
    const { admin, token } = input.fields
    return new SetAdminResult({
      tag: "Ok",
      value: new Uint8Array(),
    })
  },
)
