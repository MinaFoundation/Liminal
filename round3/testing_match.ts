import { f } from "./f.js"
import { Union } from "./Union.js"

class Dog {
  readonly tag = "Dog"
}
class Cat {
  readonly tag = "Cat"
}
class Human {
  readonly tag = "Human"
}

class Animal extends Union(Dog, Cat, Human, "Robot") {}

const animal = Animal.from(new Cat())

const f1 = f(function*() {
  if (true as boolean) yield new Dog()
  if (true as boolean) yield new Cat()
  if (true as boolean) yield new Human()
})
function* main() {
  const r = f1().when(Dog, function*(v) {})
  const w = yield* animal
    .when("Robot", function*(value) {
      yield "A" as const
      return 1
    })
    .when(Dog, function*(value) {
      yield "B" as const
      return 2
    })
    .when(Cat, function*(value) {
      return 3
    })
    .when(Human, function*(value) {
      return 4
    })
}
