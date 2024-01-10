/**
 * O padrão composite segue para tratar objetos e composição de objetos de forma
 * uniforme, de modo que cada objeto dentro do composite possa ser processado da
 * mesma maneira, inclusive uma instância de composite, pode ser passada para
 * outra.
 *
 * Observe o exemplo abaixo:
 * */

class Graphic {
  draw () {
    throw new Error('Should be implemented')
  }
}

class Square extends Graphic {
  constructor (name) {
    super()
    this.name = name
  }

  draw () {
    console.log(`drawing a square: ${this.name}`)
  }
}

class Circle extends Graphic {
  constructor (name) {
    super()
    this.name = name
  }

  draw () {
    console.log(`drawing a circle: ${this.name}`)
  }
}

// composite em si
class CompositeGraphic extends Graphic {
  constructor () {
    super()
    this.graphics = []
  }

  add (graphic) {
    this.graphics.push(graphic)
  }

  draw () {
    console.log('Drawing composition:')
    this.graphics.forEach(graphic => graphic.draw())
  }
}

// usando o composite
const circle1 = new Circle('Circle 1')
const circle2 = new Circle('Circle 2')
const square1 = new Square('Square 1')
const square2 = new Square('Square 2')

const composite1 = new CompositeGraphic()
composite1.add(circle1)
composite1.add(circle2)
composite1.add(square1)

const composite2 = new CompositeGraphic()
composite2.add(square2)
composite2.add(composite1)

composite2.draw()
