/* 
 * O padrão command consiste em abstrair um pedido ou ação, por meio
 * de uma interface que aciona outra classe que contém um método para
 * realizar uma ação em um objeto.
 *
 * O command é basicamente composto por algumas entidades, sendo elas:
 *
 * reveiver: o receiver é a classe que detém o objeto com as funcionalidades que
 * pertencem a ele implementadas. Podemos visualizar o receiver como uma classe
 * do mundo real, ou seja, alguma classe que não foi implementada para o
 * command. Por exemplo, um service em um ambiente MVC.
 *
 * command interface: este é um contrato de preparo entre a classe de execução e
 * o command propriamente dito. Ela irá gerar os commands especializados em
 * determinada ação invocada a partir do receiver e que especializa objetos em
 * determinada tarefa no universo do receiver.
 *
 * commands: commands são as classes especializadas na execução de determinado
 * aspecto do receiver. Lembrando que o receiver por si só acaba agrupando em si
 * todas as funcionalidades relacionadas ao mesmo, de modo que o pattern command
 * se aplica melhor a classes com muitos métodos e de uma complexidade superior.
*/

class Receiver {
  shineBlue () {
    console.log("It's shining blue")
  }

  shineRed () {
    console.log("It's shining red")
  }
}

class CommandInterface {
  execute () {
    throw new Error('Should be implemented')
  }
}

// Concret command
class ShineBlueCommand extends CommandInterface {
  constructor (receiver) {
    super()
    this.receiver = receiver
  }

  execute () {
    this.receiver.shineBlue()
  }
}

// Concret command
class ShineRedCommand extends CommandInterface {
  constructor (receiver) {
    super()
    this.receiver = receiver
  }

  execute () {
    this.receiver.shineRed()
  }
}

class Invoker {
  constructor () {
    this.command = null
  }

  setCommand (command) {
    this.command = command
  }

  executeCommand () {
    this.command.execute()
  }
}

const receiver = new Receiver()
const shineBlueCommand = new ShineBlueCommand(receiver)
const shineRedCommand = new ShineRedCommand(receiver)

const invoker = new Invoker()

invoker.setCommand(shineBlueCommand)
invoker.executeCommand() // It's shinning blue

invoker.setCommand(shineRedCommand)
invoker.executeCommand() // It's shinning red

/* 
  * No exemplo acima, o intuito era comparar o padrão Command com uma
  * arma, um alvo e uma munição. O alvo apenas brilha de uma cor,
  * dependendo do método, acionado pela munição, chamado no exemplo, Command.
  * A classe invoker apenas recebe uma munição e a dispara. Percebemos então
  * toda a abstração deste padrão.
*/
