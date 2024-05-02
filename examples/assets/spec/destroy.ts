import * as L from "liminal"
import { TokenId } from "./common.js"

export class DestroyProps extends L.struct({
  token: TokenId,
}) {}

export class DestroyError extends L.union(
  L.tag("NotAdmin"),
  L.tag("NoSuchTokenId"),
) {}

export class DestroyResult extends L.Result(null!, DestroyError) {}

export const Destroy = L.f(function*(input: DestroyProps) {
  throw 0
})
