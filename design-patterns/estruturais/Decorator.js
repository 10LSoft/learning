/*
  * O design pattern decorator é utilizado para adicionar novas funcionalidades
  * a objetos específicos. Este decora a classe, ou seja, entrega além da
  * funcionalidade antiga que ainda se mantém usada.
  * 
  * Para dividirmos a explicação, teremos:
  * 
  * Componenet -> Aquele quem possui o comportamento padrão
  * Decorator -> Aquele quem decora a classe padrão.
*/

// Component
class Coffee {
  cost() {
    return 2.00;
  }

  description() {
    return 'Coffee';
  }
}

// Decorator
class CoffeeWithMilk extends Coffee {
  constructor(coffee) {
    super();
    this._coffee = coffee;
  }

  cost() {
    return this._coffee.cost() + 1.50;
  }

  description() {
    return `${this._coffee.description()} with milk`;
  }
}

const coffee = new Coffee();
console.log(coffee.description()); // Coffee

const coffeeWithMilk = new CoffeeWithMilk(coffee);
console.log(coffeeWithMilk.description()); // Coffee with milk
