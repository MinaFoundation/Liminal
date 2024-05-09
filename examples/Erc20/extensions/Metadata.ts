import * as L from "liminal"

export const name_ = new L.State(L.String)
export const symbol_ = new L.State(L.String)
export const decimals_ = new L.State(L.u8)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L15
export function* name() {
  return yield* name_
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L20
export function* symbol() {
  return yield* symbol_
}

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L25
export function* decimals() {
  return yield* decimals_
}
