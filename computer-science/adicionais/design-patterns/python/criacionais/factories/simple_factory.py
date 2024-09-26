class Car:
    def run(self):
        return "Driving a car"


class Bike:
    def run(self):
        return "Riding a bike"


class SimpleVehicleFactory:
    @staticmethod
    def create_vehicle(vehicle_type):
        if vehicle_type == "car":
            return Car()
        elif vehicle_type == "bike":
            return Bike()
        else:
            raise ValueError("Unknown vehicle type")


car = SimpleVehicleFactory.create_vehicle("car")
print(car.run())

bike = SimpleVehicleFactory.create_vehicle("bike")
print(bike.run())
