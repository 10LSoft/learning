/**
 * Eu enxergo o padrão multiton (ou militon) como sendo uma variação do método object tool, contudo no lugar
 * de uma lista, eu uso um dicionárion para checar a existência de determinada chave, e por
 * conseqência um objeto específico para determinado propósito.
 *
 * Sabemos que buscas por hash são mais eficientes do que por uma propriedade ou especificidade de
 * determinado objeto que precise ser testada. Por isso, quando for possível classificar os tipos
 * de objeto no cache por nome, o multiton é altamente eficiente.
 *
 * Vamos a um exemplo em javascript:
 * */

class DatabaseConnection {
  constructor(databaseName) {
    this.databaseName = databaseName;
    console.log(`Conectando ao banco de dados ${databaseName}...`);
    // Simulação de inicialização da conexão
  }

  // Método da classe
  query(sqlQuery) {
    console.log(`Executando a query '${sqlQuery}' no banco de dados ${this.databaseName}.`);
  }
}

class DatabaseManager {
  constructor() {
    this.connections = {};
  }

  // Método para obter ou criar uma conexão para um banco de dados específico
  getConnection(databaseName) {
    if (!this.connections[databaseName]) {
      this.connections[databaseName] = new DatabaseConnection(databaseName);
    }
    return this.connections[databaseName];
  }
}

// Uso do Multiton
const dbManager = new DatabaseManager();

const connection1 = dbManager.getConnection('database1');
connection1.query('SELECT * FROM table1');

const connection2 = dbManager.getConnection('database2');
connection2.query('SELECT * FROM table2');

const connection3 = dbManager.getConnection('database1');
connection3.query('UPDATE table1 SET column1 = value1 WHERE id = 1');

