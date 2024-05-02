import * as L from "liminal"
import { TokenId, TokenMetadata } from "./common.js"

export class SetMetadataProps extends L.struct({
  token: TokenId,
  metadata: TokenMetadata,
}) {}

export class SetMetadataError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class SetMetadataResult extends L.Result(TokenMetadata, SetMetadataError) {}

export const SetMetadata = L.f(function*(input: SetMetadataProps) {
  return SetMetadataResult.from("Ok", [])
})
