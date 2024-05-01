import * as L from "liminal"
import { TokenId } from "./common.js"

export class DestroyProps extends L.struct({
  token: TokenId,
}) {}

export class DestroyError extends L.enum({
  NotAdmin: null!,
  NoSuchTokenId: null!,
}) {}

export class DestroyResult extends L.ResultType(
  null!,
  DestroyError,
) {}

export const Destroy = L.method(
  DestroyProps,
  null!,
  DestroyResult,
  function*(input) {
    throw 0
  },
)
