/*
  * O iterator é um padrão que nos permite percorrer um conjunto de elementos
  * sem expor as representações dele(lista, pilha, árvore, entre outros),e
  * apenas uma vez, ele retorna o próximo item, cada vez que um método chamado
  * next(ou outro nome que você prefira atribuir) é chamado.
  * 
  * Para entendermos este padrão, irei dividi-lo em:
  * 
  * IteratorInterface -> Uma interface para o iterador que possui o método:
  * getNext.
  * 
  * ConcreteIterator -> A implementação da interface do iterator, com uma
  * gama maior de informações, como seu index, e a sua quantidade de elementos
*/

class IteratorInterface {
  getNext () {
    throw new Error('It should be implemented')
  }
}

class ConcreteIterator extends IteratorInterface {
  constructor (array) {
    super()

    this.array = array
    this.index = 0
  }

  hasNext () {
    return this.array.length > this.index
  }

  getNext () {
    if (this.hasNext()) {
      const result = this.array[this.index]
      this.index++

      return result
    } else {
      return 'Iterator finished'
    }
  }
}

const elements = ['Person 1', 'Person 2', 'Person 3']

const elementsIterator = new ConcreteIterator(elements)

while (elementsIterator.hasNext()) {
  console.log(elementsIterator.getNext())
}
