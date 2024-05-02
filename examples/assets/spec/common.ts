import * as L from "liminal"

export class TokenId extends L.u64 {}

export class AccountInfo extends L.struct({
  balance: L.u64,
  frozen: L.bool,
}) {}

export class Accounts extends L.map(L.id, AccountInfo) {}

export class TokenInfo extends L.struct({
  admin: L.id,
  supply: L.u64,
  accounts: Accounts,
}) {}

export class Tokens extends L.map(TokenId, TokenInfo) {}

export class tokens extends L.state(Tokens) {}

export class TokenMetadata extends L.vec(L.u8) {}
