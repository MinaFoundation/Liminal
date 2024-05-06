import * as L from "liminal"

export class TokenId extends L.u64 {}

export class AccountInfo extends L.Struct({
  balance: L.u64,
  frozen: L.bool,
}) {}

export class Accounts extends L.MerkleMap(L.id, AccountInfo) {}

export class TokenInfo extends L.Struct({
  admin: L.id,
  supply: L.u64,
  accounts: Accounts,
}) {}

export class Tokens extends L.MerkleMap(TokenId, TokenInfo) {}

export const tokens = new L.State(Tokens)

export class TokenMetadata extends L.MerkleList(L.u8) {}
