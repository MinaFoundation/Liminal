import { T } from "liminal"

export class CreateProps extends T.struct({
  supply: T.u64,
  admin: T.pk,
  decimals: T.u8,
  metadata: T.u8a(32),
}) {}

export class CreateEvent extends T.union({
  A: 0,
  B: 1,
  C: 2,
}) {}

export class CreateError extends T.union({
  A: 0,
  B: 1,
  C: 2,
}) {}

export class CreateSuccess extends T.struct({
  id: T.u64,
}) {}

export class CreateResult extends T.result(
  CreateSuccess,
  CreateError,
) {}

export const create = T.method(
  CreateProps,
  CreateEvent,
  CreateResult,
)
