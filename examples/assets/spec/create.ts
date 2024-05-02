import * as L from "liminal"
import { TokenMetadata } from "./common.js"

export interface CreateInput {
  supply: L.u64
  admin: L.id
  decimals: L.u8
  metadata: TokenMetadata
}

export class CreateOk extends L.struct({
  id: L.u64,
}) {}

export class CreateError extends L.union("InsufficientFunds", "AnotherProblem") {}

export class CreateResult extends L.union(CreateOk, CreateError) {}

export const create = L.f(function*({}: CreateInput) {
  return CreateResult.from(new CreateOk({ id: 0 }))
})
