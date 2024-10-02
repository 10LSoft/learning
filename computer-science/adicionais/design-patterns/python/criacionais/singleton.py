class Singleton:
    """
    This design pattern has the main goal into no to allow that a class
    generates more than one instance of an object.

    The __new__ method is a class method that works in the instantiation time
    and in our case, if a instance has been created, the method return this
    instance in place to bring a new one.
    """

    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super().__new__(cls)

        return cls.instance


s1 = Singleton()
s2 = Singleton()

print(s1 == s2)  # True
print(id(s1), id(s2))  # same memory address
