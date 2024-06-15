/**
 * Este padrão é responsável por armazenar e fornecer o ambiente de dependências de uma determinada
 * aplicação, de modo a mapear as dependências e fornecer um índice descritivo para estas funções
 * ou objetos. Pode ser muito útil para ambientes com multidependências, mas ao mesmo tempo permite
 * que os vários itens que compões hierarquicamente uma determinada aplicação possm ser
 * desacoplados e testados separadamente.
 *
 * Vamos a um exemplo de composição de DI Container:
 * */

// Definição das classes de serviço (dependências)
class Logger {
  log(message) {
    console.log(`[Logger] ${message}`);
  }
}

class DataService {
  constructor(logger) {
    this.logger = logger;
  }

  fetchData() {
    this.logger.log('Fetching data from server...');
    // Lógica para buscar dados do servidor
    console.log('Dados recebidos.');
  }
}

// Definição do DI Container
class DIContainer {
  constructor() {
    this.services = new Map();
  }

  register(name, service) {
    this.services.set(name, service);
  }

  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Serviço '${name}' não registrado.`);
    }
    return service;
  }
}

// Uso do DI Container
const container = new DIContainer();

// Registro das dependências no container
container.register('logger', new Logger());
container.register('dataService', new DataService(container.resolve('logger')));

// Utilização das dependências através do container
const dataService = container.resolve('dataService');
dataService.fetchData();
