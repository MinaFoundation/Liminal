import { IncomingMessage } from "http"

export function parseText(request: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let requestBody = ""
    request.on("data", (chunk) => {
      requestBody += chunk
    })
    request.on("end", () => {
      resolve(requestBody)
    })
  })
}

export async function parseJson<T = any>(request: IncomingMessage): Promise<T> {
  return JSON.parse(await parseText(request))
}
