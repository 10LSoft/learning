/*
  * O padrão chain of responsability é um conjunto de passos para processar
  * uma requisição. Podemos fazer uma analogia aos middlewares usados
  * geralmente na WEB. Para um chain of responsability ser implementado temos
  * que ter: uma sequencia de handlers(os passos), e uma forma de organizarmos
  * eles para serem executados em sequência. Algo muito interessante, é que
  * um handler pode passar a requesição/operação para o próximo sem nem ao
  * menos ter executado uma lógica em cima da mesma.
  * 
  * Para exemplificarmos, criaremos um simulador de middleware. Para isso,
  * teremos:
  * 
  * Abstract Middleware -> Um handle abstrato terá apenas um método para setar
  * o próximo middleware
  * 
  * Concret Middleware -> Um handle concreto que terá também um método para
  * processar a requisição e chamar o próximo handle(middleware)
  * 
  * Client - aquele quem irá mandar a requisição.
*/

// Abstract Middleware
class AbstractMiddleware {
  constructor(request) {
    this.nextMiddleware = null
    this.request = request
  }

  setNextMiddleware(middleware) {
    this.nextMiddleware = middleware
    return this.nextMiddleware
  }

  processRequest() {
    if (this.shouldProcess()) {
      console.log(this.successMessage)
      if (this.nextMiddleware) {
        this.nextMiddleware.processRequest()
      }
    } else {
      console.log(this.failureMessage)
    }
  }

  shouldProcess() {
    throw new Error('shouldProcess method should be implemented in concrete middleware')
  }
}

// Concrete Middleware

class CheckLoginMiddleware extends AbstractMiddleware {
  constructor(request) {
    super(request)
    this.successMessage = 'Usuário autenticado.'
    this.failureMessage = 'Usuário não está autenticado.'
  }

  shouldProcess() {
    return this.request.user.authenticated
  }
}

// Concrete Middleware
class CheckUserAgeMiddleware extends AbstractMiddleware {
  constructor(request) {
    super(request)
    this.successMessage = 'Tudo processado! Você está autorizado a entrar no sistema'
    this.failureMessage = 'Você não está autorizado a entrar neste site'
  }

  shouldProcess() {
    return this.request.user.cnh || this.request.user.age > 10
  }
}

class Client {
  constructor() {
    this.middlewares = []
  }

  use(middleware) {
    if (this.middlewares.length > 0) {
      this.middlewares[this.middlewares.length - 1].setNextMiddleware(middleware)
    }
    this.middlewares.push(middleware)
    return this
  }

  makeRequest(request) {
    if (this.middlewares.length > 0) {
      this.middlewares[0].processRequest()
    } else {
      console.log('Nenhum middleware configurado.')
    }
  }
}

// Exemplo de uso
const client = new Client()

client
  .use(new CheckLoginMiddleware({
    user: {
      authenticated: true,
      cnh: '',
      age: 18,
    },
  }))
  .use(new CheckUserAgeMiddleware())
  .makeRequest()
