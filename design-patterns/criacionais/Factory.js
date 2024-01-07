/**
 * O padrão Factory tem como objetivo principal gerar um objeto correto baseado
 * no parâmetro passado para o método que o chama, de modo que dentro muitras
 * classes disponíveis, a Factory possa selecionar a correta e enviar o objeto
 * que corresponda ao padrão desejado. */

class AbstractAnimal {
  say () {
    throw new Error('Sould be implemented')
  }
}

class Dog extends AbstractAnimal {
  say () {
    return 'hoof hoof'
  }
}

class Cat extends AbstractAnimal {
  say () {
    return 'meawww'
  }
}

class AnimalFactory {
  createAnimal (animal) {
    switch (animal) {
      case "Dog":
        return new Dog()
      case "Cat":
        return new Cat()
    }
  }
}

const factory = new AnimalFactory()

console.log(factory.createAnimal('Dog').say())
console.log(factory.createAnimal('Cat').say())
