import { id } from "./id.js"
import { u256, u64, u8 } from "./int.js"

export interface CreateInput {
  supply: u64
  admin: id
  decimals: u8
  metadata: u256
}

export class CreateOk extends L.struct({
  id: L.u64,
}) {}

export class CreateError extends L.union("InsufficientFunds", "AnotherProblem") {}

export class CreateResult extends L.union(CreateOk, CreateError) {}

export const create = L.f(function*({}: CreateInput) {
  return CreateResult.from(new CreateOk({ id: 0 }))
})
