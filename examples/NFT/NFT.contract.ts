import * as L from "liminal"

export class TokenId extends L.u256 {}
export class TokenMetadata extends L.Bytes(32) {}
export class Tokens extends L.MerkleMap(TokenId, TokenMetadata) {}
export class TokenOwner extends L.id {}
export class TokenOwners extends L.MerkleMap(TokenId, TokenOwner) {}

export const admin_ = L.id.state()
export const globalMetadata_ = TokenMetadata.state()
export const maxReached_ = L.bool.state()
export const nextId_ = L.u256.state()
export const tokens_ = Tokens.state()
export const tokenOwners_ = TokenOwners.state()

export class MaxTokensReachedError extends L.Struct({ tag: "MaxTokensReachedError" }) {}
export class NotAuthorizedError extends L.Struct({ tag: "NotAuthorizedError" }) {}
export class SpecifiedTokenDneError extends L.Struct({ tag: "SpecifiedTokenDneError" }) {}
export class InternalConsistencyError extends L.Struct({ tag: "InternalConsistencyError" }) {}

export const create = L.f({
  metadata: TokenMetadata,
  maxReached: maxReached_,
  nextId: nextId_,
  tokens: tokens_,
  tokenOwners: tokenOwners_,
  admin: admin_,
}, function*({ metadata, nextId, tokens, tokenOwners, maxReached, admin }) {
  yield* L.sender.equals(admin).assert(NotAuthorizedError.new())
  yield* maxReached.if(MaxTokensReachedError.new())["?"](MaxTokensReachedError)
  const tokenId = TokenId.new(nextId)
  yield* nextId
    .equals(L.u256.max())
    .not()
    .if(nextId_(nextId.add(L.u256.new(1))))
    .else(maxReached_(L.bool.new(true)))
  yield* tokens_(tokens.set(tokenId, metadata))
  yield* tokenOwners_(tokenOwners.set(tokenId, L.sender))
})

export const destroy = L.f({
  tokenId: TokenId,
  tokens: tokens_,
  tokenOwners: tokenOwners_,
}, function*({ tokens, tokenOwners, tokenId }) {
  yield* tokens
    .get(tokenId)
    .case(L.None, SpecifiedTokenDneError.new())
    ["?"](SpecifiedTokenDneError)
  yield* tokenOwners
    .get(tokenId)
    .case(L.None, InternalConsistencyError.new())
    .case(
      TokenOwner,
      (tokenOwner) => tokenOwner.equals(L.sender).not().if(NotAuthorizedError.new()),
    )
    ["?"](InternalConsistencyError)
    ["?"](NotAuthorizedError)
  yield* tokens_(tokens.delete(tokenId))
  yield* tokenOwners_(tokenOwners.delete(tokenId))
  //
})

export const transfer = L.f(
  { to: L.id, tokenId: TokenId, tokens: tokens_, tokenOwners: tokenOwners_ },
  function*({ to, tokenId, tokens, tokenOwners }) {
    yield* tokens.get(tokenId)["?"](L.None, SpecifiedTokenDneError.new())
    const tokenOwner = yield* tokenOwners.get(tokenId)["?"](L.None, InternalConsistencyError.new())
    yield* tokenOwner.equals(L.sender).not().if(NotAuthorizedError.new())["?"](NotAuthorizedError)
    yield* tokenOwners_(tokenOwners.set(tokenId, to))
  },
)
