/**
 * O padrão Abstract Factory permite que uma determinada família de objetos
 * possa ser gerada por meio de uma factory especializada e que retorne somente
 * objetos do tipo daquela família especificada.
 * */

class AbstractFactory {
  createCat () {
    throw new Error('Should be implemented')
  }

  createDog () {
    throw new Error('Should be implemented')
  }
}

class Animal {
  speak () {
    throw new Error('Should be implemented')
  }
}

class WildCat extends Animal {
  speak () {
    return 'roooooaaaarrr'
  }
}

class DomesticCat extends Animal {
  speak () {
    return 'meaaaaawww'
  }
}

class WildDog extends Animal {
  speak () {
    return 'graaaauuuuurrrr'
  }
}

class DomesticDog extends Animal {
  speak () {
    return 'wooof wooof'
  }
}

class DomesticAnimals extends AbstractFactory {
  createCat () {
    return new DomesticCat()
  }

  createDog () {
    return new DomesticDog()
  }
}

class WildAnimals extends AbstractFactory {
  createCat () {
    return new WildCat()
  }

  createDog () {
    return new WildDog()
  }
}

function animalSpeaking(factory) {
  const cat = factory.createCat()
  const dog = factory.createDog()

  console.log(cat.speak())
  console.log(dog.speak())
}

const wildAnimals = new WildAnimals()
const domesticAnimals = new DomesticAnimals()

animalSpeaking(wildAnimals)
animalSpeaking(domesticAnimals)
