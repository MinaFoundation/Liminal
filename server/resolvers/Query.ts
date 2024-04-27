import { Field, PublicKey, TokenId } from "o1js"
import { QueryResolvers } from "../../target/resolvers.js"

export const query: QueryResolvers = {
  async actions(_, { input: { address, fromActionState, endActionState, tokenId } }, context) {
    const fetched = await context.net.fetchActions(
      PublicKey.fromBase58(address),
      {
        fromActionState: fromActionState ? Field.from(fromActionState) : undefined,
        endActionState: endActionState ? Field.from(endActionState) : undefined,
      },
      tokenId ? TokenId.fromBase58(tokenId) : undefined,
    )
    return fetched.map(({ actions, hash }) => {
      return ({
        actionState: {},
        actionData: [{ data: actions }],
        transactionInfo: {
          hash,
          authorizationKind: "",
          memo: "",
          status: "",
        },
      })
    }) as any
  },
  events(_, { input }) {
    return null!
  },
}
