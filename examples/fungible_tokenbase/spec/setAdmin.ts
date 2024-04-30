import * as L from "liminal"
import { TokenId } from "./common.js"

export class SetAdminProps extends L.struct({
  token: TokenId,
  newAdmin: L.pk,
}) {}

export class SetAdminError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class SetAdminResult extends L.ResultType(
  L.pk,
  SetAdminError,
) {}

export const setAdmin = L.method(
  SetAdminProps,
  null!,
  SetAdminResult,
)
