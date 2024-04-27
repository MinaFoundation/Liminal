import { ParsedArgs } from "../cli/parseArgs.js"
import { Logger } from "../util/Logger.js"

export class Context {
  constructor(
    readonly args: ParsedArgs,
    readonly logger: Logger,
    readonly controller: AbortController,
  ) {}
}
