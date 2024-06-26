import * as L from "liminal"

export class MultisigId extends L.Authority({ proposal: L.Vk }, function*({ proposal }) {
  const multisig = yield* multisigs.get(this)
    ["?"](L.None)
  const approvals = yield* multisig.fields.approvals.get(proposal)
    ["?"](L.None)
  yield* approvals.size
    .gte(multisig.fields.threshold)
    .assert(InsufficientApprovals.new())
  return proposal
}) {}
export class Members extends L.LSet(L.id) {}
export class Approvals extends L.Mapping(L.Vk, Members) {}
export class Multisig extends L.Struct({
  id: L.id,
  members: Members,
  approvals: Approvals,
  threshold: L.u8,
}) {}
export class Multisigs extends L.Mapping(L.id, Multisig) {}
export const multisigs = Multisigs.new()

export class ProposalAlreadyExistsError extends L.Struct({ tag: "ProposalAlreadyExistsError" }) {}
export class MultisigDneError extends L.Struct({ tag: "MultisigDneError" }) {}
export class ProposalDneError extends L.Struct({ tag: "ProposalDneError" }) {}
export class SoleSignatoryError extends L.Struct({ tag: "SoleSignatoryError" }) {}
export class InsufficientApprovals extends L.Struct({ tag: "InsufficientApprovals" }) {}

export const Create = L.effect({
  members: Members,
  threshold: L.u8,
}, function*({ members, threshold }) {
  yield* threshold.gte(2).assert(SoleSignatoryError.new())
  const id = MultisigId.new()
  const multisig = Multisig.new({
    id,
    members,
    threshold,
    approvals: Approvals.new(),
  })
  yield* multisigs.assign(multisigs.set(id, multisig))
  return id
})

export const Fund = L.effect({
  multisigId: L.id,
  amount: L.u256,
}, ({ multisigId, amount }) => L.sender.send(amount, multisigId))

export const Destroy = L.effect(
  { multisigId: L.id },
  ({ multisigId }) => multisigs.assign(multisigs.delete(multisigId)),
)

export const Propose = L.effect({
  multisigId: L.id,
  vk: L.Vk,
}, function*({ multisigId, vk }) {
  const { fields: { approvals } } = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const approvalSet = yield* approvals.get(vk)["?"](L.None)
  yield* approvalSet.assign(approvalSet.add(L.sender))
})

export const Approve = L.effect({
  multisigId: L.id,
  proposalId: L.Vk,
}, function*({ multisigId, proposalId }) {
  const { fields: { approvals } } = yield* multisigs.get(multisigId)
    ["?"](L.None, MultisigDneError.new())
  const proposal = yield* approvals.get(proposalId)
    ["?"](L.None, ProposalDneError.new())
  yield* proposal.assign(proposal.add(L.sender))
})
