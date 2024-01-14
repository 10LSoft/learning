/**
 * O padrão singleton monostate (ou somente monostate), serve para que, mesmo
 * usando mais de uma instância de uma determinada classe, o estado entre
 * qualquer destas instâncias seja um estado centralizado de modo a permitir que
 * todos os objetos consigam atuar com estes valores.
 *
 * Uma maneira comum de implementar o monostate usando javascript é por meio de
 * valores estáticos. Seria algo mais ou menos assim:
 * */

class SingletonMonostate {
  static sharedState = {
    prop1: 'property 1',
    prop2: 'property 2'
  }

  getState () {
    console.log('SingletonMonostate value:')
    return SingletonMonostate.sharedState
  }

  setState (newProps) {
    SingletonMonostate.sharedState = { ...SingletonMonostate.sharedState, ...newProps }
  }
}

const monostate1 = new SingletonMonostate()
const monostate2 = new SingletonMonostate()

console.log(monostate1.getState())
console.log(monostate2.getState())

monostate1.setState({ prop1: 'new value for prop1' })

console.log(monostate1.getState())
console.log(monostate2.getState())

/**
 * Contudo nem sempre o uso de valores estáticos é recomendado por problemas
 * relacionados a acoplamento e possibilidade de alteração indesejada (ou
 * imprevista) em sistemas assíncronos. Para estes casos, uma abordagem
 * relacionada ao compartilhamento de objetos poderia ser mais indicada.
 *
 * Seria assim:
 * */

class SingletonMonostate2 {
  constructor () {
    if (!SingletonMonostate2.sharedReference) {
      this._sharedReference = {
        prop1: 'prop1 value',
        prop2: 'prop2 value'
      }

      SingletonMonostate2.sharedReference = this._sharedReference
    } else {
      this._sharedReference = SingletonMonostate2.sharedReference
    }
  }

  getState () {
    this._sharedReference = SingletonMonostate2.sharedReference
    return this._sharedReference
  }

  setState (newProps) {
    SingletonMonostate2.sharedReference = { ...this._sharedReference, ...newProps }
    this._sharedReference = SingletonMonostate2.sharedReference
  }
}

const monostate3 = new SingletonMonostate2()
const monostate4 = new SingletonMonostate2()

console.log('monostate3', monostate3.getState())
console.log('monostate4', monostate4.getState())

monostate3.setState({ prop1: 'another value for monostate' })

console.log('monostate3', monostate3.getState())
console.log('monostate4', monostate4.getState())
