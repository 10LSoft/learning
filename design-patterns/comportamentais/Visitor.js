/*
  * O visitor é um padrão que permite intervenções de outras classes em um
  * elemento específico. Ou seja, uma classe terá um método capaz de fazer
  * com que outra classe realize operações com sigo mesmo.
  * 
  * Dividiremos o código a seguir em algumas partes:
  * 
  * ElementInterface -> Interface que apenas vai aceitar o visitor.
  * ConcreteElement -> Elemento concreto que implementará a interface
  * ElementInterface e terá mais algumas informações próprias.
  * 
  * VisitorInterface -> Interface que contém os métodos de operação, mas não
  * os implementa
  * 
  * ConcreteVisitor -> Implementa a interface VisitorInterface.
  * 
  * No exemplo a seguir, criaremos uma lojinha online onde o Visitor irá
  * calcular o ganho total baseado no produto
*/

// ElementInterface
class ProductInterface {
  acceptVisitor (visitor) {
    throw new Error('It should be implemented')
  }
}

// Concrete Element
class Pizza extends ProductInterface {
  constructor () {
    super()

    this.soldPizzas = 0
    this.price = 15
  }

  acceptVisitor (visitor) {
    visitor.calculateItensPizza(this)
  }

  sellPizza (quantity) {
    this.soldPizzas += quantity
  }
}

// Concrete Element
class Hamburguer extends ProductInterface {
  constructor () {
    super()

    this.soldHamburguers = 0
    this.price = 2.50
  }

  acceptVisitor (visitor) {
    visitor.calculateItensHamburguer(this)
  }

  sellHamburguer (quantity) {
    this.soldHamburguers += quantity
  }
}

// VisitorInterface
class VisitorInterface {
  calculateItensPizza () {
    throw new Error('It should be implemented')
  }

  calculateItensHamburguer () {
    throw new Error('It should be implemented')
  }
}

// Concrete Visitor
class ConcreteVisitor extends VisitorInterface {
  calculateItensPizza (element) {
    const result = element.soldPizzas * element.price
    console.log(result)
    return result
  }

  calculateItensHamburguer (element) {
    const result = element.soldHamburguers * element.price
    console.log(result)
    return result
  }
}

const pizzas = new Pizza()
const hamburgers = new Hamburguer()

pizzas.sellPizza(10)
hamburgers.sellHamburguer(10)

const elements = [pizzas, hamburgers]

elements.forEach(element => {
  element.acceptVisitor(new ConcreteVisitor())
})

/*
  * Output:
  * 150
  * 25
*/
