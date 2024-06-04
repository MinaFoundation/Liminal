import * as L from "liminal"

export const name_ = L.String.state()
export const symbol_ = L.String.state()
export const decimals_ = L.u8.state()

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L15
export const name = L.f({ name_ }, ({ name_ }) => name_)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L20
export const symbol = L.f({ symbol_ }, ({ symbol_ }) => symbol_)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L25
export const decimals = L.f({ decimals_ }, ({ decimals_ }) => decimals_)
