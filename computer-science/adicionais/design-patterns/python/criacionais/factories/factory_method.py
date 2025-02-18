"""
O Factory Method é um padrão de projeto que define uma interface para criação
de objetos, permitindo que as subclasses decidam qual classe concreta
instanciar. Dessa forma, ele promove o princípio do aberto/fechado, facilitando
a extensibilidade sem modificar o código existente.

Diferente da instanciação direta de objetos, o Factory Method encapsula a
lógica de criação dentro de um método especializado, que pode ser sobrescrito
por subclasses para definir qual objeto concreto deve ser retornado.

Por exemplo, suponha que temos uma hierarquia de veículos, onde Carro e
Bicicleta herdam de uma classe base Veículo. Em vez de instanciar diretamente
um carro ou uma bicicleta no código cliente, utilizamos um método de fábrica
definido em uma classe base, e cada subclasse concreta implementa esse método
para fornecer a instância apropriada.

A essência do Factory Method está na delegação da criação do objeto para
subclasses, permitindo maior flexibilidade e desacoplamento entre o código
cliente e as classes concretas.
"""
from abc import ABC, abstractmethod


# Classe base para os produtos (Veículos)
class Vehicle(ABC):
    @abstractmethod
    def create(self):
        pass


# Produtos concretos
class Car(Vehicle):
    def create(self):
        return "Carro criado!"


class Bike(Vehicle):
    def create(self):
        return "Bicicleta criada!"


# Classe base da Fábrica
class VehicleFactory(ABC):
    @abstractmethod
    def create_vehicle(self) -> Vehicle:
        pass


# Fábricas concretas para cada tipo de veículo
class CarFactory(VehicleFactory):
    def create_vehicle(self) -> Vehicle:
        return Car()


class BikeFactory(VehicleFactory):
    def create_vehicle(self) -> Vehicle:
        return Bike()


# Cliente que utiliza a fábrica sem depender das classes concretas
def client_code(factory: VehicleFactory):
    vehicle = factory.create_vehicle()
    print(vehicle.create())


# Testando o Factory Method
if __name__ == "__main__":
    print("Criando um Carro:")
    client_code(CarFactory())

    print("\nCriando uma Bicicleta:")
    client_code(BikeFactory())
