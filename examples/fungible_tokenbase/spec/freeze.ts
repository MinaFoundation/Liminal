import * as L from "liminal"
import { TokenId } from "./common.js"

export class FreezeProps extends L.struct({
  token: TokenId,
  who: L.pk,
}) {}

export class FreezeError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class FreezeResult extends L.ResultType(
  null!,
  FreezeError,
) {}

export const freeze = L.method(
  FreezeProps,
  null!,
  FreezeResult,
)
