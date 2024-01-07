/**
 * O padrão Factory Method é uma variação do design Factory que atribui às
 * subclasses a tarefa de criação do objeto correto a partir de um método da
 * interface que compõe as fábricas. Seria mais ou menos o seguinte:
 * */

class AbstractAnimalFactory {
  createAnimal () {
    throw new Error('Should be implemented')
  }
}

class Cat {
  say () {
    return 'meow'
  }
}

class Dog {
  say () {
    return 'hoof hoof'
  }
}

class CatFactory extends AbstractAnimalFactory {
  createAnimal () {
    return new Cat()
  }
}

class DogFactory extends AbstractAnimalFactory {
  createAnimal () {
    return new Dog()
  }
}

const cat = new CatFactory().createAnimal()
const dog = new DogFactory().createAnimal()

console.log(cat.say())
console.log(dog.say())
