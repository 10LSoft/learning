/**
 * O padrão de design command serve para encapsular comandos de modo a permitir que os mesmos
 * possam ser expansivos e funcionar como um catalizador para um ambiente mais favorável ao uso de
 * classes.
 *
 * No caso específico deste padrão, os itens que o compõem são os seguintes:
 *
 * 1. command interface: a da interface com o método de execução;
 * 2. contrete commands: implementação e especialização da interface command em um ou mais objetos
 *    que realizam o processamento segundo especificação, mas que fazem isso no mesmo método
 *    designiado como rais na interface;
 * 3. receiver: o receiver é uma classe que implementa todos os métodos de todos os commands
 *    concretos e que, por consequência será passado para o command especialista para de fato
 *    executar o processamento implementado;
 * 4. invoker: o invoker é a abstração da execução em si. Ele é responsável por permitir que a
 *    excução seja desviada de um objeto para outro por meio de um método específico, geralmente
 *    chamado de setCommand.
 *
 * Vejamos abaixo a implementação de um exemplo do padrão command:
 * */

// interface
class Command {
  execute() {
    throw new Error('Command.execute() must be implemented');
  }
}

// implementation of command class
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.on();
  }
}

// implementation of command class
class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.off();
  }
}

// receiver
class Light {
  on() {
    console.log('Light is on');
  }
  off() {
    console.log('Light is off');
  }
}

// invoker
class RemoteControl {
  constructor() {
    this.command = null;
  }

  setCommand(command) {
    this.command = command;
  }
  pressButton() {
    this.command.execute();
  }
}

// client
const light = new Light();
const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);
const remote = new RemoteControl();

remote.setCommand(lightOn);
remote.pressButton(); // Light is on

remote.setCommand(lightOff);
remote.pressButton(); // Light is off
