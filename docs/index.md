# Liminal Overview

Liminal is a WIP TypeScript library for authoring and interacting with zero-knowledge smart
contracts.

## Why does Liminal Exist?

Tool and service builders are running into issues regarding representing, sharing and utilizing
contract metadata for a wide range of use cases, some of which are listed below. Liminal takes––what
is potentially––a first step towards addressing these issues with a TypeScript DSL for modeling
contracts and interactions with contracts. It does not directly handle transforming that
representation into say the JavaScript runtime execution. It is a tool for describing the contract
and transactions.

In the long term, Liminal may also serve as a specification of capabilities supported in any given
zero-knowledge smart contract. In this case, the Liminal AST would be a common representation
against which builders could support a wide range of targets, such as block explorer metadata,
wallet transaction insights, persistent storage adapters and even non-JS runtimes.

## What Does Liminal Unblock?

Upgradability

Documentation experiences like Rustdoc

Contract dependency visualization

exchanges, daos, wallets, indexers, anything dynamic

https://github.com/MinaFoundation/Core-Grants/issues/33
