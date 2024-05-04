import { f } from "./f.js"
import { Matcher, Union } from "./Union.js"

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
const animal = Animal.from(new Dog())
function* z() {
  const x = yield* animal
    .when(Dog, function*(v) {
      yield "HELLO!" as const
      return 1
    })
    .when("Robot", function*(v) {
      return 2
    })
    .when(Cat, function*(v) {
      return 3
    })
    .when(Human, function*(v) {
      return 4
    })
}
const f1 = f(function*() {
  if (true as boolean) yield new Dog()
  if (true as boolean) yield new Cat()
  if (true as boolean) yield new Human()
  return 1
})
function* main() {
  const r = yield* f1()
    .when(Dog, function*(v) {
      return 1
    })
    .when(Cat, function*(v) {
      return 2
    })
    .when(Human, function*(v) {
      return 3
    })
  // const w = yield* animal
  //   .when("Robot", function*(value) {
  //     yield "A" as const
  //     return 1
  //   })
  //   .when(Dog, function*(value) {
  //     yield "B" as const
  //     return 2
  //   })
  //   .when(Cat, function*(value) {
  //     return 3
  //   })
  //   .when(Human, function*(value) {
  //     return 4
  //   })
}
