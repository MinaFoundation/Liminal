import { event, impl, T } from "liminal"
import * as spec from "./spec/mod.js"

class Context extends impl(spec, {
  create: T.vec(spec.CreateProps),
  setMetadata: T.vec(spec.SetMetadataProps),
  another: T.vec(spec.SetMetadataProps),
}) {}

// @ts-ignore
export default new Context({
  create,
  setMetadata,
})

function* create(this: Context, value: spec.CreateProps) {
  yield this.create.push(value)
  yield event(new spec.CreateEvent.A())
}

function* setMetadata(this: Context, value: spec.SetMetadataProps) {
  yield this.setMetadata.push(value)
}
