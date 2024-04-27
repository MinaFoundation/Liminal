import { T } from "liminal"

export class SetMetadataProps extends T.struct({
  metadata: T.u8a(32),
}) {}

export const SetMetadataSuccess = T.unit

export class SetMetadataEvent extends T.union({
  A: null!,
  B: null!,
  C: null!,
}) {}

export class SetMetadataError extends T.union({
  A: null!,
  B: null!,
  C: null!,
}) {}

export class SetMetadataResult extends T.result(
  SetMetadataSuccess,
  SetMetadataError,
) {}

export const setMetadata = T.method(
  SetMetadataProps,
  SetMetadataEvent,
  SetMetadataResult,
)
