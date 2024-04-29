import * as L from "liminal"

export class CreateProps extends L.struct({
  supply: L.u64,
  admin: L.pk,
  decimals: L.u8,
  metadata: L.vec(L.u8),
}) {}

export class CreateValue extends L.struct({
  id: L.u64,
}) {}

export class CreateError extends L.enum({
  InsufficientFunds: null!,
  AnotherProblem: null!,
}) {}

export class CreateResult extends L.Result(
  CreateValue,
  CreateError,
) {}

export const create = new L.Method(CreateProps, null!, CreateResult)

export const someState = L.item(L.vec(L.u8))
