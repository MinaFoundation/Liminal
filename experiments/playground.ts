import * as Counter from "../examples/Counter/Counter.contract.ts"
import * as L from "../mod.ts"

const normalized = L.Call.collect(Counter.increment)
console.log(normalized)
