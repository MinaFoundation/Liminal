import assert from "node:assert"
import { ArrayOfLength } from "../../util/ArrayOfLength.js"

export async function accounts<N extends number>(count: N) {
  const devUrl = process.env.LIMINAL_SERVER
  assert(typeof devUrl === "string")
  return fetch(`${devUrl}accounts?count=${count}`).then((v) => v.json()) as ArrayOfLength<string, N>
}
