/**
 * O padrão Composite permite que objetos sejam tratados de forma individual e
 * que eles sejam compostos por composição de outros pré-definidos, ou seja, os
 * compostos (objeto do composite) são criados a partir da junção de outros
 * objetos.
 *
 * Um detalhe é que os objetos da composição devem ser homogêneos, pois um
 * processamento ocorrerá nestes objetos, por*/

class Human {
  say () {
    throw new Error('should be implemented')
  }
}

class NoiadaDeAfogados extends Human {
  constructor (name) {
    this.name = name
    super()
  }
}

const teste = new NoiadaDeAfogados('embosa')
