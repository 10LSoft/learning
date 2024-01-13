/**
 * Explicação de Gênese
 * ====================
 *
 * O padrão Chain of responsibility é responsável por decidir se processa uma
 * determinada requisição ou se passa para o próximo elo da corrente processar.
 *
 * Basicamente funciona como métodos (ou atributos) em sistemas orientados a
 * protótipos como o javascript, por exemplo.
 *
 * Ele tem a estrutura de uma lista encadeada e pode passar a requisição pra
 * cima de modo que um determinado nó da lista possa processa-lo, mas não
 * significa que a requisição deva ser passada sempre para o primeiro elo da
 * corrente. A emissão da requisição deve poder ser randômica.
 *
 * Uma informação que deve ser considerada quando falamos sobre chain of
 * responsibility é que os handlers (ou elos da corrente) podem ou não ser
 * especializados, de modo que cada um destes elos podem servir iguais
 * propósitos ou fornecer funcionalidades específicas em cada ponto da corrente.
 *
 * Uma estrutura dessas poderá ter um base handle com implementações
 * padronizadas para ser utilizado como base, mas isto não é obrigatório! Os
 * handlers poderão implementar a interface sem maiores problemas.
 *
 * O padrão também poderá ser visto como uma esteira de ações a serem tomadas
 * sobre um determinado processamento. Algo como as esteiras de CI/CD para
 * desenvolvimento e deploy continuos.
 *
 * Vamos considerar como exemplo essa questão do CI/CD:
 * */

/*
 * Explicação de Ryan
 * ==================
 *
  * O padrão chain of responsibility é um conjunto de passos para processar
  * uma requisição. Podemos fazer uma analogia aos middlewares usados
  * geralmente na WEB. Para um chain of responsibility ser implementado temos
  * que ter: uma sequência de handlers (os passos), e uma forma de organizarmos
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
    this.request = request
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
    this.request = request
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
