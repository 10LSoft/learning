/**
 * O padrão Factory Method é uma variação do design Factory que atribui às
 * subclasses a tarefa de criação do objeto correto a partir de um método da
 * interface que compõe as fábricas. Seria mais ou menos o seguinte:
 * */

class AbstractAnimalFactory {
  create() {
    throw new Error('Should be implemented')
  }
}

class Cat {
  say() {
    return 'meow'
  }
}

class Dog {
  say() {
    return 'hoof hoof'
  }
}

class CatFactory extends AbstractAnimalFactory {
  create() {
    console.log('Creating a cat')
    return new Cat()
  }
}

class DogFactory extends AbstractAnimalFactory {
  create() {
    console.log('Creating a dog')
    return new Dog()
  }
}

const cat = new CatFactory().create()
const dog = new DogFactory().create()

console.log(cat.say())
console.log(dog.say())

/**
 * Para este caso, basicamente temos o foco do algorítmo voltado à fábrica em vez de focado no
 * objeto. Perceba que quem mantém aí condições de ser mais profundamente implementado é quem
 * deriva da classe abstrata AbstractAnimalFactory.
 * */
