import { Counter } from "../examples/Counter/Counter.contract.ts"
import * as L from "../mod.ts"

const counter = new Counter()
const normalized = L.Branch.collect(counter.increment.bind(counter))
console.log(normalized)
