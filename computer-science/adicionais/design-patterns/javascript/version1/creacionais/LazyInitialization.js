/**
 * Este é um design pattern que, assim como o Object Pool, permite obter o máximo de desempenho
 * quando o assunto é a criação custosa de determinado objeto. A diferença entre estes dois padrões
 * é que, enquanto o object pool cria um pool de objetos e tenta, sempre por reutilização, não
 * criar um novo objeto, o lazy intialization tenta somente instanciar o objeto quando isso for
 * absolutamente necessário.
 *
 * É importante perceber aqui que, caso o objeto nunca seja usado, ele jamais será instanciado, o
 * que assegura a economia de recursos, especialmente em caso de criação de objetos complexos.
 *
 * Vamos ver um exemplo:
 * */

class HeavyResource {
  constructor() {
    console.log('Criando uma instância do recurso pesado...');
    // Simulação de operação custosa
    for (let i = 0; i < 1000000000; i++) {
      // Operação vazia apenas para simular custo computacional
    }
    console.log('Instância do recurso pesado criada.');
  }

  // Método da classe
  doSomething() {
    console.log('Fazendo algo com o recurso pesado...');
  }
}

class LazyResourceProxy {
  constructor() {
    this.heavyResource = null;
  }

  // Método para obter o recurso pesado apenas quando necessário
  getHeavyResource() {
    if (!this.heavyResource) {
      this.heavyResource = new HeavyResource();
    }
    return this.heavyResource;
  }
}

// Uso do Lazy Initialization
const lazyProxy = new LazyResourceProxy();

// O recurso pesado só é criado quando necessário
lazyProxy.getHeavyResource().doSomething(); // Aqui o recurso é realmente criado e utilizado

