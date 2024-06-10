import { decodeHex } from "@std/encoding"
import * as L from "liminal"
import { U256Counter } from "liminal/std"

export class TokenId extends L.u256 {}
export class Token extends L.Bytes(32) {}
export class Tokens extends L.Mapping(TokenId, Token) {}
export class TokenOwner extends L.id {}
export class TokenOwners extends L.Mapping(TokenId, TokenOwner) {}

export const admin = L.id.fromHex(Deno.env.get("NFT_ADMIN_ID")!)
export const globalMetadata = Token.new(decodeHex(Deno.env.get("NFT_METADATA")!))
export const tokens = Tokens.new()
export const tokenOwners = TokenOwners.new()

export const idCounter = U256Counter.default()

export class NotAuthorizedError extends L.Struct({ tag: "NotAuthorizedError" }) {}
export class SpecifiedTokenDneError extends L.Struct({ tag: "SpecifiedTokenDneError" }) {}

export const getOwner = L.f({ tokenId: TokenId }, ({ tokenId }) => tokenOwners.get(tokenId))

export const getToken = L.f({ tokenId: TokenId }, ({ tokenId }) => tokens.get(tokenId))

export const create = L.f({ metadata: Token }, function*({ metadata }) {
  yield* L.sender.equals(admin).assert(NotAuthorizedError.new())
  const tokenId = TokenId.new(yield* idCounter.next())
  yield* tokens.assign(tokens.set(tokenId, metadata))
  yield* tokenOwners.assign(tokenOwners.set(tokenId, L.sender))
  return tokenId
})

export const destroy = L.f({ tokenId: TokenId }, function*({ tokenId }) {
  yield* tokens.get(tokenId)["?"](L.None, SpecifiedTokenDneError.new())
  yield* tokenOwners
    .get(tokenId)
    .match(TokenOwner, (owner) =>
      owner
        .equals(L.sender)
        .not()
        .assert(NotAuthorizedError.new()))
    ["?"](L.None, L.Never.new())
  yield* tokens.assign(tokens.delete(tokenId))
  yield* tokenOwners.assign(tokenOwners.delete(tokenId))
})

export const transfer = L.f({
  to: L.id,
  tokenId: TokenId,
}, function*({ to, tokenId }) {
  yield* tokens.get(tokenId)["?"](L.None, SpecifiedTokenDneError.new())
  const tokenOwner = yield* tokenOwners.get(tokenId)["?"](L.None, L.Never.new())
  yield* tokenOwner.equals(L.sender).assert(NotAuthorizedError.new())
  yield* tokenOwners.assign(tokenOwners.set(tokenId, to))
})
