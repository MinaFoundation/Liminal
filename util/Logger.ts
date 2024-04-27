import { blue, gray, red } from "@std/fmt/colors"

export class Logger {
  info(action: string, message: string) {
    console.info(blue("liminal"), gray(action), message)
  }

  error(message: string) {
    console.info(blue("liminal"), red("error"), message)
  }
}
