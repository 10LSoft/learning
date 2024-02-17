/**
 * O padrão Singleton tem como objetivo fornecer uma classe que promova apenas
 * uma instância de determinado objeto, de modo que haja somente um ponto de uso
 * para tal instância em todo o sistema.
 * */

class Singleton {
  constructor () {
    if (Singleton.instance) {
      return Singleton.instance
    }

    this.someProperty = 'I am a singleton instance'
    Singleton.instance = this

    return this
  }

  someMethod () {
    console.log(this.someProperty)
  }
}

const obj1 = new Singleton()
const obj2 = new Singleton()

obj1.someMethod()
obj2.someProperty = 'Now I get another value inside property'
obj1.someMethod()

console.log(obj1 === obj2)
