/*
  * O state é um padrão que tem como objetivo, mudar seu comportamento interno
  * dependendo do seu estado. Sendo divido em:
  * context -> aquele que mudará de comportamento,
  * state -> interface para os estados.
  * concret state -> estado concreto implementado.
*/

// Context
class Computer {
  constructor() {
    this.batteryState = new LowBatteryOff(this);
  }

  setBatteryState(state) {
    this.batteryState = state;
  }

  turnOnLowBatteryMode() {
    this.batteryState.turnOn();
  }

  turnOffLowBatteryMode() {
    this.batteryState.turnOff();
  }

  useBattery() {
    this.batteryState.batteryUsage();
  }
}

// State
class BatteryState {
  constructor(context) {
    this.context = context;
  }

  turnOn() {
    throw new Error('Should be implemented');
  }

  turnOff() {
    throw new Error('Should be implemented');
  }

  batteryUsage() {
    throw new Error('Should be implemented');
  }
}

// Concret state
class LowBatteryOn extends BatteryState {
  turnOff() {
    console.log('Desligando modo pouca bateria.');
    this.context.setBatteryState(new LowBatteryOff(this.context));
  }

  batteryUsage() {
    console.log('Usando bateria de forma mais eficiente.');
  }
}

// Concret state
class LowBatteryOff extends BatteryState {
  turnOn() {
    console.log('Ligando modo pouca bateria.');
    this.context.setBatteryState(new LowBatteryOn(this.context));
  }

  batteryUsage() {
    console.log('Usando bateria de forma mais performática.');
  }
}

const macbook = new Computer();

macbook.useBattery();
// Usando bateria de forma mais performática.

macbook.turnOnLowBatteryMode();
// Ligando modo pouca bateria.

macbook.useBattery();
// Usando bateria de forma mais eficiente.
