/**
 * O padrão Bridge tem como objetivo principal separar a criação do sistema em
 * partes hierarquicas complementares, de modo que uma esteja separada
 * fisicamente da outra e que elas se conectem por meio de composição de
 * objetos.
 *
 * Este padrão pode ser facilmente confundido com o padrão Strategy, por
 * exmeplo, pois basicamente um objeto mencionado em uma abstração é fruto da
 * implementação de outra classe e o relacionamento das duas se dá por este
 * fato. Contudo a ideia por trás do Bridge é permitir que ambas as classes
 * possam evoluir separadamente, sem que isto prejudique o funcionamento do
 * todo.
 * */

class AbstractDrawingAPI {
  drawCircle() {
    throw new Error('Should be implemented')
  }
}

class DrawingAPI1 extends AbstractDrawingAPI {
  drawCircle(x, y, radius) {
    console.log('This is the API 1')
    console.log(`Creating a circle with ${x}, ${y} and Radius: ${radius}`)
  }
}

class DrawingAPI2 extends AbstractDrawingAPI {
  drawCircle(x, y, radius) {
    console.log('This is the API 2')
    console.log(`Creating a circle with ${x}, ${y} and Radius: ${radius}`)
  }
}

/**
 * Abaixo usarei agora uma classe que faça uso por composição das APIs criads
 * acima para desenhar círculos. Perceba que neste caso eu deixarei a forma
 * aberta para possíveis novas implementações futuras. 
 * */

class Shape {
  constructor (DrawingAPI) {
    // this is the bridge - other class injected here
    this.drawingAPI = new DrawingAPI()
  }

  draw () {
    // in this method I can do something with the bridge
    throw new Error('Should be implemented')
  }
}

class Circle extends Shape {
  constructor (x, y, radius, DrawingAPI) {
    // here I call the upper bridge setting up
    super(DrawingAPI)
    this.x = x
    this.y = y
    this.radius = radius
  }

  draw () {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius)
  }
}

const circle1 = new Circle(2, 5, 7, DrawingAPI1)
const circle2 = new Circle(7, 12, 20, DrawingAPI2)

circle1.draw()
circle2.draw()
