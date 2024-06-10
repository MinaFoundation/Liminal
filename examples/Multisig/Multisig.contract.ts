import * as L from "liminal"
import { U256Counter } from "liminal/std"

// TODO: remove upon cleanup of F type
declare const Call: L.Factory<L.F<{}, never, never>>

export class Members extends L.LSet(L.id) {}

export class ProposalId extends L.u256 {}
export class Proposal extends L.Struct({
  call: Call,
  approvals: L.u8,
}) {}
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

export const multisigsCount = U256Counter.default()
export const multisigs = Multisigs.new()
export const proposalsCount = U256Counter.default()

export const create = L.f({ members: Members, threshold: L.u8 }, function*({ members, threshold }) {
  yield* threshold.gte(2).assert(SoleSignatoryError.new())
  yield* multisigs.assign(
    multisigs.set(
      yield* multisigsCount.next(),
      Multisig.new({
        members,
        threshold,
        proposals: Proposals.new(),
      }),
    ),
  )
})

export const destroy = L.f({ multisigId: MultisigId }, function*({ multisigId }) {
  yield* multisigs.assign(multisigs.delete(multisigId))
})

export const propose = L.f({ multisigId: MultisigId, call: Call }, function*({ multisigId, call }) {
  const multisig = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const proposalId = yield* proposalsCount.next()
  const proposals = multisig.fields.proposals.set(proposalId, Proposal.new({ call, approvals: 0 }))
  yield* multisigs.assign(
    multisigs.set(
      multisigId,
      Multisig.new({
        ...multisig.fields,
        proposals,
      }),
    ),
  )
})

export const approve = L.f({
  multisigId: MultisigId,
  proposalId: ProposalId,
}, function*({ multisigId, proposalId }) {
  const multisig = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const proposal = yield* multisig.fields.proposals.get(proposalId)
    ["?"](L.None, ProposalDneError.new())
  yield* multisigs.assign(
    multisigs.set(
      multisigId,
      Multisig.new({
        ...multisig.fields,
        proposals: multisig.fields.proposals.set(
          proposalId,
          Proposal.new({
            ...proposal.fields,
            approvals: proposal.fields.approvals.add(1),
          }),
        ),
      }),
    ),
  )
  yield* proposal.fields.approvals
    .into(L.u256)
    .equals(multisig.fields.members.size)
    .if(proposal.fields.call({}))
})
