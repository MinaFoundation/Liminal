import * as L from "liminal"
import { Counter } from "liminal/std"

declare const Call: L.Factory<L.F<{}, never, never>>

/** The signatories of a given multisig account. */
export class Members extends L.LSet(L.id) {}

export class ProposalId extends L.u256 {}
/** Contains information about the given proposal. */
export class Proposal extends L.Struct({
  call: Call,
  approvals: L.u8,
}) {}
/** A lookup from the proposal's ID to the details of that proposal. */
export class Proposals extends L.Mapping(ProposalId, Proposal) {}

export class MultisigId extends L.u256 {}
/** Contains information about the given multisig. */
export class Multisig extends L.Struct({
  members: Members,
  proposalCounter: Counter,
  proposals: Proposals,
  threshold: L.u8,
}) {}
/** A lookup from the multisig's ID to the details of that multisig. */
export class Multisigs extends L.Mapping(MultisigId, Multisig) {}

export const multisigs = Multisigs.new()

export class MultisigDneError extends L.Struct({ tag: "MultisigDneError" }) {}

export const multisigCounter = Counter.default()

export const create = L.f({
  members: Members,
  threshold: L.u8,
}, function*({ members, threshold }) {
  const multisigId = MultisigId.new(yield* multisigCounter.next())
  const multisig = Multisig.new({
    members,
    proposalCounter: Counter.default(),
    proposals: Proposals.new(),
    threshold,
  })
  yield* multisigs.assign(multisigs.set(multisigId, multisig))
})

export const destroy = L.f({ multisigId: MultisigId }, function*({ multisigId }) {
  yield* multisigs.assign(multisigs.delete(multisigId))
})

export const propose = L.f({
  multisigId: MultisigId,
  call: Call,
}, function*({ multisigId, call }) {
  const multisig = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const proposalId = yield* multisig.fields.proposalCounter.next()
  const proposals = multisig.fields.proposals.set(proposalId, Proposal.new({ call, approvals: 0 }))
  const newMultisig = Multisig.new({ ...multisig.fields, proposals })
  yield* multisigs.assign(multisigs.set(multisigId, newMultisig))
})

export const approve = L.f({ proposalId: ProposalId }, function*({ proposalId }) {})

// 1. create a multisig for the group that you want to sign
// const multisigId = create({ signatories: [...userIds], threshold: 4 })
// const proposalId = propose({ f, multisigId })
// vote({ f, proposalId })
// vote({ f, proposalId })
// vote({ f, proposalId })
// ... executes the proposal
