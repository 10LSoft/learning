"""
O design pattern Abstract Factory tem como objetivo principal estabelecer a
criação de famílias de objetos, de modo que as fábricas úteis de objetos sejam
relacionados a uma categoria específica, ou seja, um grupo ou família de
determinado objeto.

No exemplo abaixo você poderá verificar que para diversos veículos (carro ou
moto) existem fábricas especializadas na criação de veículos de luxo ou
econômicos.
"""
from abc import ABC, abstractmethod


# Produtos
class Car(ABC):
    @abstractmethod
    def drive(self):
        raise NotImplementedError("Should be implemented")


class LuxuryCar(Car):
    def drive(self):
        return "Driving a luxury car"


class EconomyCar(Car):
    def drive(self):
        return "Driving an economy car"


class Bike(ABC):
    @abstractmethod
    def ride(self):
        raise NotImplementedError("Should be implemented")


class LuxuryBike(Bike):
    def ride(self):
        return "Riding a luxury bike"


class EconomyBike(Bike):
    def ride(self):
        return "Riding an economy bike"


# Fábricas abstratas
class VehicleFactory(ABC):
    @abstractmethod
    def create_car(self):
        raise NotImplementedError("Should be implemented")

    @abstractmethod
    def create_bike(self):
        raise NotImplementedError("Should be implemented")


# Fábricas concretas
class LuxuryVehicleFactory(VehicleFactory):
    def create_car(self):
        return LuxuryCar()

    def create_bike(self):
        return LuxuryBike()


class EconomyVehicleFactory(VehicleFactory):
    def create_car(self):
        return EconomyCar()

    def create_bike(self):
        return EconomyBike()


# Uso
luxury_factory = LuxuryVehicleFactory()
luxury_car = luxury_factory.create_car()
luxury_bike = luxury_factory.create_bike()

print(luxury_car.drive())  # Driving a luxury car
print(luxury_bike.ride())  # Riding a luxury bike
