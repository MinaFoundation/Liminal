import * as L from "liminal"
import { TokenId, TokenMetadata } from "./common.js"

export interface SetMetadataProps {
  token: TokenId
  metadata: TokenMetadata
}

export class SetMetadataError extends L.Union("NotAnAdmin", "AnotherProblem") {}

export class SetMetadataResult extends L.Union(TokenMetadata, SetMetadataError) {}

export const setMetadata = L.f(function*(input: SetMetadataProps) {
  return SetMetadataResult.from(TokenMetadata.from(new L.MerkleListNative()))
})
