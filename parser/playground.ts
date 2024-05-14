import { Counter } from "../examples/Counter/Counter.contract.ts"
import * as L from "../mod.ts"

const counter = new Counter()
const parsed = L.parse(counter.increment.bind(counter))
console.log(parsed)
