import { CallerNode, SelfNode, SenderNode } from "./EnvNode.js"

export const caller = new CallerNode().instance()

export const self = new SelfNode().instance()

export const sender = new SenderNode().instance()
