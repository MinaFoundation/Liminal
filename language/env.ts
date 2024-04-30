import { pk } from "./pk.js"
import { Any } from "./type.js"

export declare function builtin<T extends Any>(key: keyof any): InstanceType<T>

export const senderKey = Symbol()
export const sender = builtin<typeof pk>(senderKey)
