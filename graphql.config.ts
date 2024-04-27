import type { IGraphQLConfig } from "graphql-config"

export default {
  projects: {
    default: {
      schema: "./schema.gql",
      extensions: {
        codegen: {
          generates: {
            "./target/resolvers.ts": {
              plugins: ["typescript", "typescript-resolvers"],
              config: {
                enumsAsTypes: true,
                contextType: "../server/Context.js#Context",
                useIndexSignature: true,
                useTypeImports: true,
              },
            },
          },
        },
      },
    },
  },
} satisfies IGraphQLConfig
