import { Vk as VkNative } from "../lib/mod.ts"
import type { EffectType } from "./F.ts"
import type { PureType } from "./Pure.ts"
import { Value } from "./Value.ts"

export class Vk extends Value.make("Vk")<VkSource, VkNative> {}
export class VkSource {
  constructor(readonly f: InstanceType<EffectType | PureType>) {}
}
