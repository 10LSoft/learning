/**
 * O padrão Facade tem como proposta principal fornecer uma interface cujo
 * objetivo é a simplificação com relação a um ambiente mais hostil, de modo a
 * parecer que trata-se de um ambiente mais simples e com um acesso bem mais
 * amigável.
 * */

class Complicated1 {
  methodA () { return 'Complicated 1 - methodA' }
  methodB () { return 'Complicated 1 - methodB' }
}

class Complicated2 {
  methodA () { return 'Complicated 2 - methodA' }
  methodB () { return 'Complicated 2 - methodB' }
}

class Complicated3 {
  methodA () { return 'Complicated 3 - methodA' }
  methodB () { return 'Complicated 3 - methodB' }
}

class Facade {
  constructor () {
    this.complicated1 = new Complicated1()
    this.complicated2 = new Complicated2()
    this.complicated3 = new Complicated3()
  }

  runFacade () {
    console.log(this.complicated1.methodA())
    console.log(this.complicated1.methodB())
    console.log(this.complicated2.methodA())
    console.log(this.complicated2.methodA())
    console.log(this.complicated3.methodB())
    console.log(this.complicated3.methodB())
  }
}

const facade = new Facade()
facade.runFacade()
