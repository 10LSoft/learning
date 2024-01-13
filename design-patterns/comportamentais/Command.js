/* 
 * O padrão command consiste em abstrair um pedido ou ação, por meio
 * de uma interface que aciona outra classe que contém um método para
 * realizar uma ação em um objeto.
*/

// Receiver
class Target {
  shineBlue () {
    console.log("It's shining blue")
  }

  shineRed () {
    console.log("It's shining red")
  }
}

// Command Interface
class CommandInterface {
  execute () {
    throw new Error('Should be implemented')
  }
}

// Concret command
class ShineBlueCommand extends CommandInterface {
  constructor (target) {
    super()
    this.target = target
  }

  execute () {
    this.target.shineBlue()
  }
}

class ShineRedCommand extends CommandInterface {
  constructor (target) {
    super()
    this.target = target
  }

  execute () {
    this.target.shineRed()
  }
}

// Invoker
class Gun {
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

const target = new Target()
const shineBlueCommand = new ShineBlueCommand(target)
const shineRedCommand = new ShineRedCommand(target)

const gun = new Gun()

gun.setCommand(shineBlueCommand)
gun.executeCommand() // It's shinning blue

gun.setCommand(shineRedCommand)
gun.executeCommand() // It's shinning red

/* 
  * No exemplo acima, o intuito era comparar o padrão Command com uma
  * arma, um alvo e uma munição. O alvo apenas brilha de uma cor,
  * dependendo do método, acionado pela munição, chamado no exemplo, Command.
  * A classe Gun apenas recebe uma munição e a dispara. Percebemos então
  * toda a abstração deste padrão.
*/
