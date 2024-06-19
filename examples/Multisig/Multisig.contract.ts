import * as L from "liminal"
import { U256Counter } from "liminal/std"

export class Call extends L.Bytes(64) {}

export class Members extends L.LSet(L.id) {}

// TODO: how to actually represent the multisig id + signer + allow signing on behalf of the multisig?
export class ProposalId extends L.u256 {}
export class Proposal extends L.Struct({ call: Call, approvals: L.u8 }) {}
export class Proposals extends L.Mapping(ProposalId, Proposal) {}

export class MultisigId extends L.u256 {}
export class Multisig extends L.Struct({
  members: Members,
  proposals: Proposals,
  threshold: L.u8,
}) {}
export class Multisigs extends L.Mapping(MultisigId, Multisig) {}

export class MultisigDneError extends L.Struct({ tag: "MultisigDneError" }) {}
export class ProposalDneError extends L.Struct({ tag: "ProposalDneError" }) {}
export class SoleSignatoryError extends L.Struct({ tag: "SoleSignatoryError" }) {}

export const multisigsCount = U256Counter.new()
export const multisigs = Multisigs.new()
export const proposalsCount = U256Counter.new()

export class Create
  extends L.F({ members: Members, threshold: L.u8 }, function*({ members, threshold }) {
    yield* threshold.gte(2).assert(SoleSignatoryError.new())
    yield* multisigs.assign(
      multisigs.set(yield* multisigsCount.next(), {
        members,
        threshold,
        proposals: Proposals.new(),
      }),
    )
  })
{}

export class Destroy extends L.F({ multisigId: MultisigId }, function*({ multisigId }) {
  yield* multisigs.assign(multisigs.delete(multisigId))
}) {}

export class Propose
  extends L.F({ multisigId: MultisigId, call: Call }, function*({ multisigId, call }) {
    const multisig = yield* multisigs.get(multisigId)
      ["?"](L.None, MultisigDneError.new())
    const proposalId = yield* proposalsCount.next()
    const proposals = multisig.fields.proposals.set(proposalId, { call, approvals: 0 })
    yield* multisigs.assign(multisigs.set(multisigId, { ...multisig.fields, proposals }))
  })
{}

export class Approve extends L.F({
  multisigId: MultisigId,
  proposalId: ProposalId,
}, function*({ multisigId, proposalId }) {
  const multisig = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const proposal = yield* multisig.fields.proposals.get(proposalId)
    ["?"](L.None, ProposalDneError.new())
  yield* multisigs.assign(
    multisigs.set(multisigId, {
      ...multisig.fields,
      proposals: multisig.fields.proposals.set(proposalId, {
        ...proposal.fields,
        approvals: proposal.fields.approvals.add(1),
      }),
    }),
  )
}) {}

export function Execute<Y extends L.Yield, R extends L.Result>(_f: L.F<Y, R, {}>) {
  return L.F({
    multisigId: MultisigId,
    proposalId: ProposalId,
  }, function*({ multisigId, proposalId }) {
    const multisig = yield* multisigs.get(multisigId)["?"](L.None)
    const proposal = yield* multisig.fields.proposals.get(proposalId)["?"](L.None)
    proposal
    // TODO... how to actually execute `f` on behalf of the multisig?
  })
}
