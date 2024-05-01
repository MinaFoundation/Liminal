import * as L from "liminal"

export class CreateProps extends L.struct({
  supply: L.u64,
  admin: L.id,
  decimals: L.u8,
  metadata: L.vec(L.u8),
}) {}

export class CreateOk extends L.struct({
  id: L.u64,
}) {}

export class CreateError extends L.enum({
  InsufficientFunds: null!,
  AnotherProblem: null!,
}) {}

export class CreateResult extends L.ResultType(
  CreateOk,
  CreateError,
) {}

export const Create = L.method(
  CreateProps,
  null!,
  CreateResult,
  function*(input) {
    const { admin, decimals, metadata, supply } = input.d()
    return new CreateResult({
      tag: "Ok",
      value: { id: 0 },
    })
  },
)
