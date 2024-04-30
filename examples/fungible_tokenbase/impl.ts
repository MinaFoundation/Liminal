import * as L from "liminal"
import { Context } from "./common.js"
import * as spec from "./spec/mod.js"

export const create = spec.create<Context>(function*(input) {
  return new spec.CreateResult({
    tag: "Ok",
    value: { id: 0 },
  })
})

export const destroy = spec.destroy<Context>(function*(input) {
  return new spec.DestroyResult({ tag: "Ok" })
})

export const mint = spec.mint<Context>(function*(input) {
  return new spec.MintResult({ tag: "Ok" })
})

export const burn = spec.burn<Context>(function*(input) {
  return new spec.BurnResult({ tag: "Ok" })
})

export const transfer = spec.transfer<Context>(function*(input) {
  return new spec.TransferResult({ tag: "Ok" })
})

export const freeze = spec.freeze<Context>(function*(input) {
  return new spec.FreezeResult({ tag: "Ok" })
})

export const thaw = spec.thaw<Context>(function*(input) {
  return new spec.ThawResult({ tag: "Ok" })
})

export const setAdmin = spec.setAdmin<Context>(function*(input) {
  return new spec.SetAdminResult({
    tag: "Ok",
    value: null!,
  })
})

export const setMetadata = spec.setMetadata<Context>(function*(input) {
  return new spec.SetMetadataResult({
    tag: "Ok",
    value: null!,
  })
})

export const setSupply = spec.setSupply<Context>(function*(input) {
  return new spec.SetSupplyResult({
    tag: "Ok",
    value: null!,
  })
})
