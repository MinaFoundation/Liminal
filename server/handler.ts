import { makeExecutableSchema } from "@graphql-tools/schema"
import { graphql } from "graphql"
import { renderPlaygroundPage } from "graphql-playground-html"
import { IncomingMessage } from "http"
import * as fs from "node:fs/promises"
import { parseJson } from "../util/request.js"
import { Context } from "./Context.js"
import * as resolvers from "./resolvers/mod.js"

export async function createHandler(context: Context) {
  const schemaText = await fs.readFile(new URL("../schema.gql", import.meta.url), {
    encoding: "utf8",
  })
  const schema = makeExecutableSchema({
    typeDefs: schemaText,
    resolvers,
    resolverValidationOptions: {
      requireResolversForAllFields: "ignore",
      requireResolversForResolveType: "ignore",
      requireResolversToMatchSchema: "ignore",
    },
  })
  return async (request: IncomingMessage) => {
    const acceptsHtml = request.headers.accept?.split(",").includes("text/html") ?? false
    if (acceptsHtml) {
      const html = renderPlaygroundPage({})
      const headers = new Headers()
      headers.append("content-type", "text/html")
      return new Response(html, { headers })
    }
    const body = await parseJson(request)
    const source = body.query || body.mutation
    const result = await graphql({
      schema,
      source,
      variableValues: body.variables,
      contextValue: context,
    })
    return Response.json(result)
  }
}
