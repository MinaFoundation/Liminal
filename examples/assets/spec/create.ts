import * as L from "liminal"
import { TokenMetadata } from "./common.js"

export interface CreateInput {
  supply: L.u64
  admin: L.id
  decimals: L.u8
  metadata: TokenMetadata
}

export class CreateOk extends L.Struct({
  id: L.u64,
}) {}

export class CreateError extends L.Union("InsufficientFunds", "AnotherProblem") {}

export class CreateResult extends L.Union(CreateOk, CreateError) {}

export const create = L.f(function*({}: CreateInput) {
  return CreateResult.from(CreateOk.lift({ id: 1 }))
})
