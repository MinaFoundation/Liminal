import * as L from "liminal"
import { TokenId, TokenMetadata } from "./common.js"

export interface SetMetadataProps {
  token: TokenId
  metadata: TokenMetadata
}

export class SetMetadataError extends L.union("NotAnAdmin", "AnotherProblem") {}

export class SetMetadataResult extends L.union(TokenMetadata, SetMetadataError) {}

export const setMetadata = L.f(function*(input: SetMetadataProps) {
  return SetMetadataResult.from(new TokenMetadata([]))
})
