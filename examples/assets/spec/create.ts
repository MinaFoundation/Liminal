import * as L from "liminal"

export class CreateInput extends L.struct({
  supply: L.u64,
  admin: L.id,
  decimals: L.u8,
  metadata: L.vec(L.u8),
}) {}

export class CreateOk extends L.struct({
  id: L.u64,
}) {}

export class CreateError extends L.union("InsufficientFunds", "AnotherProblem") {}

export class CreateResult extends L.Result(CreateOk, CreateError) {}

export const Create = L.f(function*(props: CreateInput) {
  return CreateResult.from("Ok", { id: 0 })
})
