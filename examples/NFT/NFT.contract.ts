import { decodeHex } from "@std/encoding"
import * as L from "liminal"

export class TokenId extends L.u256 {}
export class Token extends L.Bytes(32) {}
export class Tokens extends L.Mapping(TokenId, Token) {}
export class TokenOwner extends L.id {}
export class TokenOwners extends L.Mapping(TokenId, TokenOwner) {}

export const admin = L.id.fromHex(Deno.env.get("NFT_ADMIN_ID")!)
export const globalMetadata = Token.new(decodeHex(Deno.env.get("NFT_METADATA")!))
export const maxReached = L.false
export const nextId = L.u256.new(0)
export const tokens = Tokens.new()
export const tokenOwners = TokenOwners.new()

export class MaxTokensReachedError extends L.Struct({
  tag: "MaxTokensReachedError",
}) {}
export class NotAuthorizedError extends L.Struct({
  tag: "NotAuthorizedError",
}) {}
export class SpecifiedTokenDneError extends L.Struct({
  tag: "SpecifiedTokenDneError",
}) {}

export const getOwner = L.f({ tokenId: TokenId }, ({ tokenId }) => tokenOwners.get(tokenId))

export const getToken = L.f({ tokenId: TokenId }, ({ tokenId }) => tokens.get(tokenId))

export const create = L.f({ metadata: Token }, function*({ metadata }) {
  yield* L.sender.equals(admin).assert(NotAuthorizedError.new())
  yield* maxReached.if(MaxTokensReachedError.new())["?"](MaxTokensReachedError)
  const tokenId = TokenId.new(nextId)
  yield* nextId
    .equals(L.u256.max())
    .not()
    .if(nextId["="](nextId.add(L.u256.new(1))))
    .else(maxReached["="](L.true))
  yield* tokens["="](tokens.set(tokenId, metadata))
  yield* tokenOwners["="](tokenOwners.set(tokenId, L.sender))
  return tokenId
})

export const destroy = L.f({ tokenId: TokenId }, function*({ tokenId }) {
  yield* tokens
    .get(tokenId)
    .match(L.None, SpecifiedTokenDneError.new())
    ["?"](SpecifiedTokenDneError)
  yield* tokenOwners
    .get(tokenId)
    .match(L.None, L.Never.new())
    .match(
      TokenOwner,
      (tokenOwner) => tokenOwner.equals(L.sender).not().if(NotAuthorizedError.new()),
    )
    ["?"](L.Never)
    ["?"](NotAuthorizedError)
  yield* tokens["="](tokens.delete(tokenId))
  yield* tokenOwners["="](tokenOwners.delete(tokenId))
})

export const transfer = L.f({
  to: L.id,
  tokenId: TokenId,
}, function*({ to, tokenId }) {
  yield* tokens.get(tokenId)["?"](L.None, SpecifiedTokenDneError.new())
  const tokenOwner = yield* tokenOwners.get(tokenId)["?"](L.None, L.Never.new())
  yield* tokenOwner.equals(L.sender).assert(NotAuthorizedError.new())
  yield* tokenOwners["="](tokenOwners.set(tokenId, to))
})
