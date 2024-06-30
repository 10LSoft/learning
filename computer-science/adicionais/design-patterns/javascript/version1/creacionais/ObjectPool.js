/**
 * O objetivo do design pattern object pool é o de não criar um novo objeto para o caso do mesmo já
 * existir em um pool de objetos, impedindo que o processo de instanciação seja executado.
* 
* Este design pattern é muito útil quando o custo de criação de um novo objeto é custoso e pode ser
* impedido. Eis abaixo uma implementação deste padrão:
* */

class ObjectPool {
  constructor() {
    this._pool = [];
  }
  create() {
    return this._pool.length === 0 ? new Object() : this._pool.pop();
  }
  release(obj) {
    this._pool.push(obj);
  }
}

// Usage
const pool = new ObjectPool();
const obj1 = pool.create();

pool.release(obj1);

const obj2 = pool.create();

console.log(obj1 === obj2); // true

/**
 * O exemplo acima considera objetos simples, mas a mesma lógica poderia ser aplicado a criação de
 * objetos mais complexos, analisando por exemplo determinada especificidade de um objeto,
 * funcionando mais ou menos como um sistema de cache.
 *
 * Observe o novo exemplo:
 * */

// Definição da classe Rectangle que será utilizada no Object Pool
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // Método para calcular a área do retângulo
  getArea() {
    return this.width * this.height;
  }
}

// Implementação do Object Pool para a classe Rectangle
class RectanglePool {
  constructor() {
    this.pool = [];
  }

  // Método para adicionar um retângulo ao pool
  addRectangle(width, height) {
    const rectangle = this.pool.find(obj => obj.width === width && obj.height === height);

    if (rectangle) {
      console.log('Reutilizando retângulo do pool.');
      return rectangle;
    } else {
      console.log('Criando novo retângulo.');
      const newRectangle = new Rectangle(width, height);
      this.pool.push(newRectangle);
      return newRectangle;
    }
  }

  // Método para listar os retângulos no pool (apenas para fins de demonstração)
  listRectangles() {
    console.log('Retângulos no pool:');
    this.pool.forEach(rectangle => console.log(`- ${rectangle.width}x${rectangle.height}`));
  }
}

// Uso do Object Pool
const pool2 = new RectanglePool();

const rectangle1 = pool2.addRectangle(10, 20); // Criando novo retângulo
const rectangle2 = pool2.addRectangle(10, 20); // Reutilizando retângulo do pool
const rectangle3 = pool2.addRectangle(15, 30); // Criando novo retângulo
const rectangle4 = pool2.addRectangle(10, 20); // Reutilizando retângulo do pool

pool2.listRectangles(); // Mostrando os retângulos no pool
