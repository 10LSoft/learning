from abc import ABC, abstractmethod


class Vehicle(ABC):
    @abstractmethod
    def create(self):
        raise NotImplementedError("Should be implemented")


class Car(Vehicle):
    def create(self):
        return "Car created"


class Bike(Vehicle):
    def create(self):
        return "Bike created"


class VehicleFactory(ABC):
    @abstractmethod
    def create_vehicle(self):
        raise NotImplementedError("Should be implemented")


class CarFactory(VehicleFactory):
    def create_vehicle(self):
        return Car()


class BikeFactory(VehicleFactory):
    def create_vehicle(self):
        return Bike()


car_factory = CarFactory()
bike_factory = BikeFactory()
car = car_factory.create_vehicle()
bike = bike_factory.create_vehicle()
print(car.create())
print(bike.create())
