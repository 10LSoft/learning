/**
 * Assim como outras factories, o factory kit tem como objetivo retornar fábricas em vez de objetos
 * de determinado tipo. Quando se usa um fatory kit, estamos adicionando mais uma camada de
 * abstração, visto que trata-se de uma abstração que retorna uma abstração.
 *
 * Quando trabalhamos com sistemas complexos, podemos nos deparar com a necessidade de retornar
 * determinado tipo, baseado em uma chamada central, impedindo que se tenha que implementar sempre
 * novas chamadas específicas. Este design pattern pode ajudar, retornando fábricas produtoras de
 * determinado padrão e que podem ser chamadas tal qual uma simple factory.
 *
 * Abaixo um exemplo de um factory kit:
 * */

// Definição das classes para diferentes tipos de veículos
class Car {
  constructor() {
    this.type = 'Car';
  }

  // Método da classe Car
  startEngine() {
    console.log('Starting car engine...');
  }
}

class Truck {
  constructor() {
    this.type = 'Truck';
  }

  // Método da classe Truck
  startEngine() {
    console.log('Starting truck engine...');
  }
}

class Motorcycle {
  constructor() {
    this.type = 'Motorcycle';
  }

  // Método da classe Motorcycle
  startEngine() {
    console.log('Starting motorcycle engine...');
  }
}

// Definição das fábricas (factories) para cada tipo de veículo
class CarFactory {
  createVehicle() {
    return new Car();
  }
}

class TruckFactory {
  createVehicle() {
    return new Truck();
  }
}

class MotorcycleFactory {
  createVehicle() {
    return new Motorcycle();
  }
}

// Uso do Factory Kit
const vehicleType = 'Truck'; // Poderia ser 'Car', 'Truck' ou 'Motorcycle'

let factory;

switch (vehicleType) {
  case 'Car':
    factory = new CarFactory();
    break;
  case 'Truck':
    factory = new TruckFactory();
    break;
  case 'Motorcycle':
    factory = new MotorcycleFactory();
    break;
  default:
    throw new Error('Tipo de veículo não suportado.');
}

const vehicle = factory.createVehicle();
vehicle.startEngine();
