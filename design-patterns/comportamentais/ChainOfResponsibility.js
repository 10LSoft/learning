/**
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

class Handler {
  constructor () {
    this.nextHandler = null
  }

  setNextHandler (handler) {
    this.nextHandler = handler
  }

  handleRequest (request) {
    if (this.nextHandler) {
      this.nextHandler.handleRequest(request)
    }
  }
}

class CompileHandler extends Handler {
  handleRequest (request) {
    console.log('Compiling code...')
    // logic for this handler
    super.handleRequest(request)
  }
}

class TestHandler extends Handler {
  handleRequest (request) {
    console.log('Running tests...')
    // logic for this handler
    super.handleRequest(request)
  }
}

class DeployHandler extends Handler {
  handleRequest (request) {
    console.log('Setting up production environment...')
    // logic for this handler
    super.handleRequest(request)
  }
}

class CICDPipeline {
  constructor () {
    this.pipeline = new CompileHandler()
    const testHandler = new TestHandler()
    const deployHandler = new DeployHandler()

    this.pipeline.setNextHandler(testHandler)
    testHandler.setNextHandler(deployHandler)
  }

  run () {
    console.log('Starting CI/CD Pipeline')
    this.pipeline.handleRequest()

    console.log('Work done!')
  }
}

const pipeline = new CICDPipeline()
pipeline.run()
