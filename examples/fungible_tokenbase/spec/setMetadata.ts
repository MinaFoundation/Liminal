import * as L from "liminal"
import { TokenId, TokenMetadata } from "./common.js"

export class SetMetadataProps extends L.struct({
  token: TokenId,
  metadata: TokenMetadata,
}) {}

export class SetMetadataError extends L.enum({
  NotAnAdmin: null!,
  AnotherProblem: null!,
}) {}

export class SetMetadataResult extends L.ResultType(
  TokenMetadata,
  SetMetadataError,
) {}

export const SetMetadata = L.method(
  SetMetadataProps,
  null!,
  SetMetadataResult,
  function*(input) {
    return new SetMetadataResult({
      tag: "Ok",
      value: [],
    })
  },
)
