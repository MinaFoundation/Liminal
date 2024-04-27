import * as L from "liminal"

export class CreateProps extends L.struct({
  supply: L.u64,
  admin: L.pk,
  decimals: L.u8,
  metadata: L.vec(L.u8),
}) {}

export class CreateError extends L.enum({
  InsufficientFunds: null!,
  Another: L.pk,
}) {}

export class CreateSuccess extends L.struct({
  id: L.u64,
}) {}
