import { CallerNode, SelfSource, SenderSource } from "./EnvNode.js"

export const caller = new CallerNode().instance()

export const self = new SelfSource().instance()

export const sender = new SenderSource().instance()
