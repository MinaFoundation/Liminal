import * as L from "liminal"

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L15
export const name = L.String.new(Deno.env.get("FT_NAME")!)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L20
export const symbol = L.String.new(Deno.env.get("FT_SYMBOL")!)

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/52c36d412e8681053975396223d0ea39687fe33b/contracts/token/ERC20/extensions/IERC20Metadata.sol#L25
export const decimals = L.u8.new(1e9)
