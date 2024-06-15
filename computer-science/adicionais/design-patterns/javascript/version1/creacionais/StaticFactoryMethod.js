/**
 * Este padrão é uma variação do padrão factory method em que a diferença é basicamente não
 * necessitar instanciar a fábrica em si, dando a um método estático este trabalho.
 *
 * Vamos ver um exemplo:
 * */

class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error('Shape is an abstract class and cannot be instantiated directly.');
    }
  }

  draw() {
    throw new Error('Method draw() must be implemented.');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  draw() {
    console.log(`Drawing a circle with radius ${this.radius}.`);
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super();
    this.sideLength = sideLength;
  }

  draw() {
    console.log(`Drawing a square with side length ${this.sideLength}.`);
  }
}

// Static Factory Method na classe Shape
class ShapeFactory {
  static createShape(type, ...args) {
    switch (type) {
      case 'circle':
        return new Circle(...args);
      case 'square':
        return new Square(...args);
      default:
        throw new Error('Tipo de forma não suportado.');
    }
  }
}

// Uso do Static Factory Method
const circle = ShapeFactory.createShape('circle', 10);
circle.draw(); // Saída: "Drawing a circle with radius 10."

const square = ShapeFactory.createShape('square', 20);
square.draw(); // Saída: "Drawing a square with side length 20."
