class Vehicle:
    def drive(self):
        raise NotImplementedError("Subclasses must implement this method")


class Car(Vehicle):
    def drive(self):
        return "Driving a car"


class Truck(Vehicle):
    def drive(self):
        return "Driving a truck"


class VehicleFactory:
    @staticmethod
    def get_car(vehicle_type):
        dictionary = {"car": Car(), "truck": Truck()}

        produced_car = dictionary.get(vehicle_type, False)

        if not produced_car:
            raise ValueError(f"Cannot produce {vehicle_type}")

        return produced_car


if __name__ == "__main__":
    car = VehicleFactory.get_car("car")
    print(car.drive())

    truck = VehicleFactory.get_car("truck")
    print(truck.drive())

    bike = VehicleFactory.get_car("bike")
