/**
 * O padrão Builder permite que objetos complexos sejam construídos passo a
 * passo, de modo que projetos grandes tenham um mapeamento onde cada tarefa
 * complexa seja quebrada em algumas com menor escopo.
 *
 * Os builders são padrões excelentes para que um projeto complexo e complicado
 * se mantenha complexo, mas simples.
 * */

class Computer {
  constructor() {
    this.cpu = null
    this.ram = null
    this.storage = null
  }

  displayConfiguration() {
    return `CPU: ${this.cpu} | Memory: ${this.ram} | Storage: ${this.storage}`
  }
}

class AbstractBuilder {
  constructor() {
    this.computer = new Computer()
  }

  fullBuild() {
    this.buildCPU()
    this.buildRAM()
    this.buildStorage()
  }

  buildCPU() {
    throw new Error('Should be implemented')
  }

  buildRAM() {
    throw new Error('Should be implemented')
  }

  buildStorage() {
    throw new Error('Should be implemented')
  }

  getResult() {
    this.fullBuild()
    return this.computer
  }
}

class GammingComputerBuilder extends AbstractBuilder {
  buildCPU() {
    this.computer.cpu = 'Intel Core i9 H Series'
  }

  buildRAM() {
    this.computer.ram = '32 GB'
  }

  buildStorage() {
    this.computer.storage = '2TB NvME SSD'
  }
}

class OfficeComputerBuilder extends AbstractBuilder {
  buildCPU() {
    this.computer.cpu = 'Intel Core i3 U'
  }

  buildRAM() {
    this.computer.ram = '8GB'
  }

  buildStorage() {
    this.computer.storage = '512GB HDD'
  }
}

const gamming = new GammingComputerBuilder().getResult()
const office = new OfficeComputerBuilder().getResult()

console.log(gamming.displayConfiguration())
console.log(office.displayConfiguration())
